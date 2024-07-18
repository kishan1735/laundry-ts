import express from "express";
import {
	authCallback,
	authRedirect,
	setRedirectCookies,
} from "../controllers/userController";
import { logout, returnType } from "../controllers/authController";

const authRouter = express.Router();

authRouter.get("/google", authRedirect);
authRouter.get("/callback", authCallback);
authRouter.get("/logout", logout);
authRouter.get("/type", returnType);
authRouter.get("/:id", setRedirectCookies);
export default authRouter;
