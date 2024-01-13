import knex, { Knex } from "knex";

export function dbOpen(): Knex {
	return knex({
		client: "pg",
		connection: {
			host : process.env.DB_CONNECTION,
			port : Number(process.env.DB_PORT),
			user: "main",
			password: "ujvFYppR@LdUSvW#",
			database: "main"
		}
	})
}