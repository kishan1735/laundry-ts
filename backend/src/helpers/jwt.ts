import jwt from "jsonwebtoken";
import { env } from "../config/schema";

export const signAccessToken = (id: string, userType: string) => {
	return jwt.sign({ id, type: "access", userType }, env.ACCESS_SECRET, {
		expiresIn: "1h",
		issuer: env.API_DOMAIN,
	});
};

export const signRefreshToken = (id: string, userType: string) => {
	return jwt.sign({ id, type: "refresh", userType }, env.REFRESH_SECRET, {
		expiresIn: "7d",
		issuer: env.API_DOMAIN,
	});
};

export const isJwtExpired = (token) => {
	const decodedToken = jwt.decode(token, { complete: true });
	if (!decodedToken) {
		throw new Error("Invalid JWT");
	}
	const exp = decodedToken.payload.exp;
	const currentTime = Math.floor(Date.now() / 1000);
	return currentTime >= exp;
};
