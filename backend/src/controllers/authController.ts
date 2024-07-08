import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { signAccessToken } from "../helpers/jwt";

export const logout = async (req: Request, res: Response) => {
	try {
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		return res.json({ status: "success", message: "Logged out successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ status: "failed", message: err.message });
	}
};

export const returnType = async (req: Request, res: Response) => {
	try {
		const accessToken =
			req.cookies.accessToken ||
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhZmExNjVlLWI0ZGQtNDNhYy1hNDc5LTJmODQwZDVjNDhiNCIsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyVHlwZSI6InVzZXIiLCJpYXQiOjE3MTk3NzQxODcsImV4cCI6MTcxOTc4NDk4NywiaXNzIjoiaHR0cDovLzEyNy4wLjAuMTo4MDAwIn0.pjbh9kpMS6_fhhgy7zHUdnPV-kVQrPz0UAQ772lah6Q";
		if (!accessToken) {
			return res
				.status(403)
				.json({ status: "failed", message: "Login and try again" });
		}
		const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
		if (!decoded) {
			return res.status(403).json({ status: "failed", message: "Invalid JWT" });
		}
		return res.status(200).json({ status: "success", type: decoded.userType });
	} catch (err) {
		return res
			.status(500)
			.json({ status: "failed", message: "Internal Server Error" });
	}
};
