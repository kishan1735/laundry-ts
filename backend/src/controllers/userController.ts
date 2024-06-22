import type { Request, Response } from "express";
import { generators, type TokenSet } from "openid-client";
import { getClient } from "../config.ts/auth";

const code_verifier = generators.codeVerifier();

export const authRedirect = async (req: Request, res: Response) => {
	try {
		const client = await getClient();

		const code_challenge = generators.codeChallenge(code_verifier);

		const authRedirect = client.authorizationUrl({
			scope: "openid email profile",
			code_challenge,
			code_challenge_method: "S256",
		});

		return res.redirect(authRedirect);
	} catch (err) {
		return res
			.status(500)
			.json({ status: "failed", message: "Authentication failed" });
	}
};

export const authCallback = async (req: Request, res: Response) => {
	try {
		const client = await getClient();

		const params = client.callbackParams(req);

		const tokenSet = await client.callback(
			`${process.env.API_DOMAIN}/auth/callback`,
			params,
			{ code_verifier },
		);
		const access_token = tokenSet.access_token;
		const refresh_token = tokenSet.refresh_token;
		const userInfo = await client.userinfo(access_token as string | TokenSet);

		console.log(userInfo);

		res.redirect(`${process.env.FRONTEND_URL}/user/dashboard`);
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ status: "failed", message: "Error while authenticating user" });
	}
};
