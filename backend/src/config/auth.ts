import { type BaseClient, Issuer } from "openid-client";
import "dotenv/config";
import { env } from "./schema";

let client: BaseClient | null = null;

export const getClient = async () => {
	if (!client) {
		const googleIssuer = await Issuer.discover("https://accounts.google.com");

		client = new googleIssuer.Client({
			client_id: env.GOOGLE_CLIENT_ID,
			client_secret: env.GOOGLE_CLIENT_SECRET,
			redirect_uris: [`${env.API_DOMAIN}/auth/callback`],
			response_types: ["code"],
		});
	}
	return client;
};
