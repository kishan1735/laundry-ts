import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "dotenv/config";
import { AppDataSource } from "./db";
import ownerRouter from "./routers/ownerRouter";
import authRouter from "./routers/authRouter";
import userRouter from "./routers/userRouter";
import { env } from "./config/schema";
import "./config/rabbitmq";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		allowedHeaders: [
			"X-ACCESS_TOKEN",
			"Access-Control-Allow-Origin",
			"Authorization",
			"Origin",
			"x-requested-with",
			"Content-Type",
			"Content-Range",
			"Content-Disposition",
			"Content-Description",
		],
		credentials: true,
		origin: env.FRONTEND_URL,
		methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
	}),
);
app.use("/api/owner", ownerRouter);
app.use("/api/user", userRouter);
app.use("/auth", authRouter);

AppDataSource.initialize()
	.then(async () => {
		app.listen(env.BACKEND_PORT);
		console.log(`Express server has started on port ${env.BACKEND_PORT}`);
	})
	.catch((error) => console.log(error));
