import type { APIRoute } from "astro";
import moment from "moment";
import { success, MissingPropertyError, MissingEntityError, ActionFailedError, error } from "../../lib/APIResponse";
import { decodeToken } from "../../lib/JsonWebToken";
import { User } from "../../lib/User";

export const post: APIRoute = async ({ request }) => {
	const body = await request.json();
	if (!body.hasOwnProperty("token")) {
		return MissingPropertyError(["token"]);
	}

	const decrypted = decodeToken(body.token);

	if (!decrypted) {
		return ActionFailedError();
	}

	// Validate the expiry date
	if (decrypted.expiry < moment().unix()) {
		return error(["Expiry date has been reached."])
	}

	// Check if the user still exists.
	const user = await User.fromPublicId(decrypted.uid)

	if (!user) {
		return MissingEntityError("user");
	}

	return success();
}