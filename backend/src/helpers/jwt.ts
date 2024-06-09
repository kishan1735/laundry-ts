import jwt from "jsonwebtoken";

export const signAccessToken = (id: string) => {
	return jwt.sign({ id, type: "access" }, process.env.ACCESS_SECRET, {
		expiresIn: "3h",
		issuer: process.env.API_DOMAIN,
	});
};

export const signRefreshToken = (id: string) => {
	return jwt.sign({ id, type: "refresh" }, process.env.REFRESH_SECRET, {
		expiresIn: "7d",
		issuer: process.env.API_DOMAIN,
	});
};
