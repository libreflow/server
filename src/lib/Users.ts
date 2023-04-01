import type { Board, User, Workspace } from "../types";
import * as crypto from "node:crypto";
import { db } from "./Shared";
import { v4 as uuid } from "uuid";

export async function getUser(uid: string): Promise<User | null> {
	if (!uid) {
		return null;
	}

	const user = await db
		.select<User>("*")
		.from("users")
		.where("uid", uid);

	if (!user) {
		return null;
	}

	return user;
}

export async function getUsers(): Promise<User[] | null> {
	const users = await db<User>("users").select("*");

	if (!users) {
		return null;
	}

	return users;
}

export async function createUser(
	username: string,
	name: string,
	password: string,
	email: string
): Promise<{
	uid: string;
	id: number;
} | false> {
	if (!username || !name || !password || !email) {
		return false;
	}

	const uid = uuid();

	let hashedPassword = crypto.createHash("sha256").update(password).digest("base64");

	const result = await db("users").insert(
		{
			username,
			name,
			password: hashedPassword,
			email,
			uid
		},
		["id"]
	);

	if (!result) {
		return false;
	}

	return {
		uid,
		id: result[0]
	};
}
