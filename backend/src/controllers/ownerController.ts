import type { Response, Request } from "express";
import bcrypt from "bcryptjs";
import { ownerRepository } from "../repositories/ownerRepository";
import { Owner } from "../entities/Owner";
import { signRefreshToken, signAccessToken } from "../helpers/jwt";

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
			.values({ name, email, password: hashedPassword, phoneNumber })
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
			.getOne();

		if (!owner) {
			throw new Error("Owner not found !! Sign Up and try again");
		}

		const pass = bcrypt.compare(owner.password, password);
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
		return res.status(500).json({ status: "error", message: "Login Failed" });
	}
};
