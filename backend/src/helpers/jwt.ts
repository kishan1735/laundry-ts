import jwt from "jsonwebtoken";

export const signAccessToken = (id: string, userType: string) => {
	return jwt.sign({ id, type: "access", userType }, process.env.ACCESS_SECRET, {
		expiresIn: "3h",
		issuer: process.env.API_DOMAIN,
	});
};

export const signRefreshToken = (id: string, userType: string) => {
	return jwt.sign(
		{ id, type: "refresh", userType },
		process.env.REFRESH_SECRET,
		{
			expiresIn: "7d",
			issuer: process.env.API_DOMAIN,
		},
	);
};
