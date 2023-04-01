import type { APIRoute } from "astro";
import { success, MissingPropertyError, error } from "../../lib/APIResponse";
import { validatePassword } from "../../lib/Password";
import { User } from "../../lib/User";
import moment from "moment";
import { encodeToken } from "../../lib/JsonWebToken";

/**
 * Ruft einen Nutzer anhand seiner uid aus der Datenbank ab.
 * @param param0 Die Request mit dem request body. Dieser enthält entweder eine uid mit der der Benutzer identifiziert werden kann.
 */
export const post: APIRoute = async ({ request }) => {
	const body = await request.json();

	if (!body.hasOwnProperty("username") || !body.hasOwnProperty("password")) {
		return MissingPropertyError(["username", "password"]);
	}

	const user = await User.fromUsername(body.username);

	if (!user) {
		return error(["Invalid username or password."]);
	}

	// Validate Password
	if (!validatePassword(user.password, body.password)) {
		return error(["Invalid username or password."]);
	}

	const expiry = moment().add(30, "days").unix();
	const token = encodeToken({ id: user.id, uid: user.uid, exp: expiry })

	return success({ token, expires: expiry });
}