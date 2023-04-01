import type { ZodError } from "zod";

export function success(data: any = {}) {
	return new Response(JSON.stringify({
		success: true,
		data
	}))
}

export function error(errors: any[]) {
	return new Response(JSON.stringify({
		success: false,
		errors
	}))
}

export function MissingPropertyError(properties: string[]) {
	return error(properties.map(property => {
		return `Missing property '${property}' in request body.`
	}));
}

/**
 * Signalisiert ein fehlendes Objekt und gibt den Fehler als HTTP Response zurück.
 * @param name Der Name der Entität, die nicht gefunden werden konnte.
 * @returns {Response} HTTP Response Objekt
 */
export function MissingEntityError(name: string): Response {
	return error([`Missing entity, ${name} does not exist.`])
}

export function ActionFailedError(): Response {
	return error(["Failed executing action, error encountered."]);
}

export function InvalidDataError(err: ZodError): Response {
	return error(err.issues);
}