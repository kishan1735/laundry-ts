import type { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ownerRepository } from "../repositories/ownerRepository";
import { Owner } from "../entities/Owner";
import { signRefreshToken, signAccessToken } from "../helpers/jwt";

interface OwnerRequest extends Request {
	owner: {
		id: string;
		name: string;
		email: string;
		phoneNumber: number;
	};
}

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
		const accessToken = await signAccessToken(owner.id);
		const refreshToken = await signRefreshToken(owner.id);

		return res.json({
			status: "success",
			message: "Logged in successfully",
			accessToken,
			refreshToken,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ status: "error", message: "Login Failed" });
	}
};

export const ownerProtect = async (req: OwnerRequest, res: Response, next) => {
	try {
		let accessToken: string;
		if (!req.headers.authorization) {
			return res
				.status(403)
				.json({ status: "failed", message: "Missing authorizartion tokens" });
		}

		if (
			req.headers.authorization.split(" ")[0] === "Bearer" &&
			req.headers.authorization.split(" ")[1]
		) {
			accessToken = req.headers.authorization.split(" ")[1];
		}
		const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
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
