import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "dotenv/config";
import { AppDataSource } from "./db";
import ownerRouter from "./routers/ownerRouter";

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
		origin: "http://localhost:5173",
		methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
	}),
);
app.use("/api/owner", ownerRouter);

AppDataSource.initialize()
	.then(async () => {
		app.listen(process.env.BACKEND_PORT);
		console.log(
			`Express server has started on port ${process.env.BACKEND_PORT}`,
		);
	})
	.catch((error) => console.log(error));
