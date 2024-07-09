import type { Request, Response } from "express";
import { generators, type TokenSet } from "openid-client";
import { getClient } from "../config/auth";
import { userRepository } from "../repositories/userRepository";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";
import type { UserRequest } from "../types/types";
import {
	isJwtExpired,
	signAccessToken,
	signRefreshToken,
} from "../helpers/jwt";
import { env } from "../config/schema";

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
			`${env.API_DOMAIN}/auth/callback`,
			params,
			{ code_verifier },
		);
		let accessToken = tokenSet.access_token;

		const userInfo = await client.userinfo(accessToken as string | TokenSet);

		let user: any = await userRepository
			.createQueryBuilder("user")
			.where("user.email=:email", { email: userInfo.email })
			.getOne();
		let id: string;

		if (!user) {
			user = await userRepository
				.createQueryBuilder()
				.insert()
				.into(User)
				.values({
					name: userInfo.name,
					email: userInfo.email,
					profile: userInfo.picture,
				})
				.execute();

			id = user.raw[0].id;
		} else {
			id = user.id;
		}
		accessToken = signAccessToken(id, "user");
		const refreshToken = signRefreshToken(id, "user");
		console.log(accessToken);
		console.log(refreshToken);
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1 * 60 * 60 * 1000,
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 30 * 60 * 60 * 1000,
		});

		return res.redirect(`${env.FRONTEND_URL}/user/dashboard`);
	} catch (err) {
		return res
			.status(500)
			.json({ status: "failed", message: "Error while authenticating user" });
	}
};

export const userProtect = async (req: UserRequest, res: Response, next) => {
	try {
		let accessToken = req.cookies.accessToken;
		if (!accessToken) {
			return res
				.status(403)
				.json({ status: "success", message: "Login and try again" });
		}
		if (isJwtExpired(accessToken)) {
			const refreshToken = req.cookies.refreshToken;
			if (!refreshToken) {
				return res
					.status(403)
					.json({ status: "failed", message: "Login and try again" });
			}
			const decodedRefresh = jwt.verify(refreshToken, env.REFRESH_SECRET);
			if (!decodedRefresh) {
				return res
					.status(403)
					.json({ status: "failed", message: "Invalid JWT" });
			}
			accessToken = await signAccessToken(
				decodedRefresh.id,
				decodedRefresh.userType,
			);
			res.clearCookie("accessToken");
			res.cookie("accessToken", accessToken, {
				httpOnly: true,
				secure: false,
				sameSite: "none",
				maxAge: 1 * 60 * 60 * 1000,
			});
		}
		let decoded: { id: string; type: string };
		try {
			decoded = await jwt.verify(accessToken, env.ACCESS_SECRET);
		} catch (err) {
			console.log(err.message, accessToken);
			if (err.message === "jwt expired") {
				const refreshToken = req.cookies.refreshToken;
				if (!refreshToken) {
					return res
						.status(403)
						.json({ status: "failed", message: "Login and try again" });
				}
				const decodedRefresh = jwt.verify(refreshToken, env.REFRESH_SECRET);
				if (!decodedRefresh) {
					return res
						.status(403)
						.json({ status: "failed", message: "Invalid JWT" });
				}
				const accessToken = await signAccessToken(
					decodedRefresh.id,
					decodedRefresh.userType,
				);
				res.clearCookie("accessToken");
				res.cookie("accessToken", accessToken, {
					httpOnly: true,
					secure: false,
					sameSite: "none",
					maxAge: 1 * 60 * 60 * 1000,
				});
				decoded = await jwt.verify(accessToken, env.ACCESS_SECRET);
			} else {
				throw new Error(err);
			}
		}
		if (!decoded.id) {
			return res
				.status(500)
				.json({ status: "failed", message: "Internal Server Error" });
		}
		const user = await userRepository
			.createQueryBuilder("user")
			.where("user.id=:id", { id: decoded.id })
			.getOne();

		req.user = user;
		next();
	} catch (err) {
		console.log(err);
		return res.status(403).json({ status: "failed", message: "Unauthorised" });
	}
};

export const getUser = async (req: UserRequest, res: Response) => {
	try {
		return res.status(200).json({ status: "success", user: req.user });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ status: "failed", message: "Internal server error" });
	}
};

export const userUpdate = async (req: UserRequest, res: Response) => {
	try {
		const { name, phoneNumber } = req.body;
		if (Number.isNaN(phoneNumber)) {
			return res
				.status(400)
				.json({ status: "failed", message: "Phone number has to be a number" });
		}
		await userRepository
			.createQueryBuilder()
			.update(User)
			.set({ name, phoneNumber: +phoneNumber })
			.where("id=:id", { id: req.user.id })
			.execute();
		return res
			.status(200)
			.json({ status: "success", message: "User updated successfully" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ status: "failed", message: "Internal server error" });
	}
};

export const userDelete = async (req: UserRequest, res: Response) => {
	try {
		await userRepository
			.createQueryBuilder()
			.delete()
			.from(User)
			.where("id=:id", { id: req.user.id })
			.execute();
		return res
			.status(204)
			.json({ status: "success", message: "Deleted successfully" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ status: "failed", message: "Error while deleting owner" });
	}
};
