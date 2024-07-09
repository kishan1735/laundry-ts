import type { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { ownerRepository } from "../repositories/ownerRepository";
import { Owner } from "../entities/Owner";
import {
	signRefreshToken,
	signAccessToken,
	isJwtExpired,
} from "../helpers/jwt";
import type { OwnerRequest } from "../types/types";
import { transporter } from "../config/nodemailer";
import { env } from "node:process";

export const ownerSignup = async (req: Request, res: Response) => {
	try {
		const { name, email, password, phoneNumber } = req.body;

		if (!email || !password || !name || !phoneNumber) {
			return res
				.status(400)
				.json({ status: "failed", message: "Provide all required fields" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const ownerExists = await ownerRepository
			.createQueryBuilder("owner")
			.where("owner.email=:email", { email })
			.getOne();
		if (ownerExists) {
			return res
				.status(400)
				.json({ status: "failed", message: "User already exists" });
		}
		await ownerRepository
			.createQueryBuilder()
			.insert()
			.into(Owner)
			.values({
				name,
				email,
				password: hashedPassword,
				phoneNumber: +phoneNumber,
			})
			.execute();
		return res
			.status(201)
			.json({ status: "success", message: "Owner created successfully" });
	} catch (err) {
		return res
			.status(500)
			.json({ status: "error", message: "Error in creating Owner" });
	}
};

export const ownerLogin = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ status: "failed", message: "Provied all required fields" });
		}
		const owner = await ownerRepository
			.createQueryBuilder("owner")
			.where("owner.email=:email", { email })
			.select(["owner.password", "owner.id"])
			.getOne();

		if (!owner) {
			throw new Error("Owner not found !! Sign Up and try again");
		}
		const pass = await bcrypt.compare(password, owner.password);
		if (!pass) {
			return res
				.status(400)
				.json({ status: "success", message: "Incorrect password" });
		}
		const accessToken = await signAccessToken(owner.id, "owner");
		const refreshToken = await signRefreshToken(owner.id, "owner");

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
			maxAge: 24 * 60 * 60 * 1000,
		});

		return res.json({
			status: "success",
			message: "Logged in successfully",
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ status: "error", message: "Login Failed" });
	}
};

export const ownerProtect = async (req: OwnerRequest, res: Response, next) => {
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
		const decoded = await jwt.verify(accessToken, env.ACCESS_SECRET);

		if (!decoded.id) {
			return res
				.status(500)
				.json({ status: "failed", message: "Internal Server Error" });
		}
		const owner = await ownerRepository
			.createQueryBuilder("owner")
			.where("owner.id=:id", { id: decoded.id })
			.getOne();

		req.owner = owner;
		next();
	} catch (err) {
		console.log(err);
		return res.status(403).json({ status: "failed", message: "Unauthorised" });
	}
};

export const getOwner = async (req: OwnerRequest, res: Response) => {
	try {
		return res.status(200).json({ status: "success", owner: req.owner });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ status: "failed", message: "Internal server error" });
	}
};

export const updateOwner = async (req: OwnerRequest, res: Response) => {
	try {
		const { name, email, phoneNumber } = req.body;
		if (Number.isNaN(phoneNumber)) {
			return res
				.status(400)
				.json({ status: "failed", message: "Phone number has to be a number" });
		}
		await ownerRepository
			.createQueryBuilder()
			.update(Owner)
			.set({ name, email, phoneNumber: +phoneNumber })
			.where("id=:id", { id: req.owner.id })
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

export const ownerDelete = async (req: OwnerRequest, res: Response) => {
	try {
		await ownerRepository
			.createQueryBuilder()
			.delete()
			.from(Owner)
			.where("id=:id", { id: req.owner.id })
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

export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const owner = await ownerRepository
			.createQueryBuilder("owner")
			.where("owner.email=:email", { email })
			.getOne();
		if (!owner) {
			return res.status(400).json({
				status: "failed",
				json: "Owner not found !! Signup and try again",
			});
		}
		const resetToken = crypto.randomBytes(8).toString("hex");

		owner.passwordResetToken = resetToken;
		owner.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
		const mailOptions = {
			from: env.EMAIL,
			to: email,
			subject: "Password Reset OTP",
			html: `<h1>Your reset password</h1><p>${resetToken}</p>`,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				res
					.status(500)
					.json({ status: "failed", message: "Error while sending email" });
			} else {
				console.log("Email sent: ", info.response);
			}
		});
		await ownerRepository.save(owner);
		return res
			.status(200)
			.json({ status: "success", message: "Email sent successfully" });
	} catch (err) {
		res
			.status(500)
			.json({ status: "failed", message: "Internal server error" });
	}
};

export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { token, password } = req.body;
		const owner = await ownerRepository
			.createQueryBuilder("owner")
			.where("owner.password_reset_token=:token", { token })
			.andWhere("owner.passwordResetExpires >=:current_date", {
				current_date: new Date().toISOString(),
			})
			.getOne();
		if (!owner) {
			return res
				.status(401)
				.json({ status: "failed", message: "Token invalid or expired" });
		}
		if (!password) {
			return res
				.status(400)
				.json({ status: "failed", message: "You have to provide password" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		owner.password = hashedPassword;
		owner.passwordResetExpires = null;
		owner.passwordResetToken = null;
		await ownerRepository.save(owner);
		return res
			.status(200)
			.json({ status: "success", message: "Password reset successfully" });
	} catch (err) {
		res
			.status(500)
			.json({ status: "failed", message: "Internal server error" });
	}
};
