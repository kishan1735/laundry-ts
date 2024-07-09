import nodemailer from "nodemailer";
import "dotenv/config";
import { env } from "./schema";

export const transporter = nodemailer.createTransport({
	service: "Gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: env.EMAIL,
		pass: env.APP_PASSWORD,
	},
});
