import express from "express";
import { authCallback, authRedirect } from "../controllers/userController";

const authRouter = express.Router();

authRouter.get("/google", authRedirect);
authRouter.get("/callback", authCallback);

export default authRouter;
