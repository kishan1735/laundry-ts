import express from "express";
import { authCallback, authRedirect } from "../controllers/userController";
import { logout, returnType } from "../controllers/authController";

const authRouter = express.Router();

authRouter.get("/google", authRedirect);
authRouter.get("/callback", authCallback);
authRouter.get("/logout", logout);
authRouter.get("/type", returnType);
export default authRouter;
