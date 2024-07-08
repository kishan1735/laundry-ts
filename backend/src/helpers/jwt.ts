import jwt from "jsonwebtoken";

export const signAccessToken = (id: string, userType: string) => {
	return jwt.sign({ id, type: "access", userType }, process.env.ACCESS_SECRET, {
		expiresIn: "1h",
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

export const isJwtExpired = (token) => {
	const decodedToken = jwt.decode(token, { complete: true });
	if (!decodedToken) {
		throw new Error("Invalid JWT");
	}
	const exp = decodedToken.payload.exp;
	const currentTime = Math.floor(Date.now() / 1000);
	return currentTime >= exp;
};
