import { z } from "zod"

export const UserTypeValidator = z.object({
	username: z.string().min(4).max(64),
	id: z.number(),
	uid: z.string().length(36),
	email: z.string().max(255),
	password: z.string().min(6),
})

export const UserRegisterValidator = z.object({
	username: z.string().min(4).max(64),
	email: z.string().max(255),
	password: z.string().min(6),
})

export type UserType = z.infer<typeof UserTypeValidator>