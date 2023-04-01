import type { APIRoute } from "astro";
import { success, MissingPropertyError, MissingEntityError, ActionFailedError, InvalidDataError, error } from "../../lib/APIResponse";
import { db } from "../../lib/Shared";
import { User } from "../../lib/User";
import { UserRegisterValidator, UserType, UserTypeValidator } from "../../lib/User/type";

/**
 * Ruft einen Nutzer anhand seiner uid aus der Datenbank ab.
 * @param param0 Die Request mit dem request body. Dieser enthält entweder eine uid mit der der Benutzer identifiziert werden kann.
 */
export const get: APIRoute = async ({ request }) => {
	const params = new URLSearchParams(request.url.split("?")[1]);

	const uid = params.get("uid")

	if (!uid) {
		return MissingPropertyError(["uid"]);
	}

	const user = await User.fromPublicId(uid);

	if (!user) {
		return MissingEntityError("user");
	}

	return success(user);
}

export const put: APIRoute = async ({ request }) => {
	const body = await request.json();

	const validate = UserRegisterValidator.safeParse(body);

	if (validate.success == false) {
		return InvalidDataError(validate.error);
	}

	// Check if the user email or username already exists.
	if (await User.fromUsername(body.username)) {
		return error(["Username is already taken!"]);
	}

	if (await User.fromEmail(body.email)) {
		return error(["Email is already taken!"]);
	}

	const result = await User.create(body as UserType);

	if (!result) {
		return ActionFailedError();
	}

	return success({ uid: result.uid, id: result.id });
}

export const post: APIRoute = async ({ request }) => {
	const body = await request.json();

	if (!body.uid) {
		return MissingPropertyError(["uid"]);
	}

	const result = await User.modify(body as UserType);

	if (!result) {
		return ActionFailedError();
	}

	return success({ uid: result.uid });
}

export const del: APIRoute = async ({ params, request }) => {
	let body = await request.json();
	if (!body.uid) {
		return error(["Missing required parameter 'uid'."]);
	}

	await db.from("users").where("uid", body.uid).delete();

	return success({});
};
