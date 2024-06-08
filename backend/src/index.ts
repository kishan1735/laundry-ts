import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "dotenv/config";
import { AppDataSource } from "./db";

const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: process.env.FRONTEND_URL,
	}),
);

AppDataSource.initialize()
	.then(async () => {
		app.listen(process.env.BACKEND_PORT);
		console.log(
			`Express server has started on port ${process.env.BACKEND_PORT}`,
		);
	})
	.catch((error) => console.log(error));
