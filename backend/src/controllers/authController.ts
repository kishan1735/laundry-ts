import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const logout = async (req: Request, res: Response) => {
	try {
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		return res.json({ status: "success", message: "Logged out successfully" });
	} catch (err) {
		return res.status(500).json({ status: "failed", message: err.message });
	}
};
