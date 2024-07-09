import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/schema";

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
		const accessToken = req.cookies.accessToken;
		if (!accessToken) {
			return res
				.status(403)
				.json({ status: "failed", message: "Login and try again" });
		}
		const decoded = jwt.verify(accessToken, env.ACCESS_SECRET);
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
