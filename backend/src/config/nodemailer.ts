import nodemailer from "nodemailer";
import "dotenv/config";

export const transporter = nodemailer.createTransport({
	service: "Gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.APP_PASSWORD,
	},
});
