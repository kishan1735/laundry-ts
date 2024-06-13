import express from "express";
import {
	forgotPassword,
	getOwner,
	ownerDelete,
	ownerLogin,
	ownerProtect,
	ownerSignup,
	resetPassword,
	updateOwner,
} from "../controllers/ownerController";

const ownerRouter = express.Router();

ownerRouter.post("/signup", ownerSignup);
ownerRouter.post("/login", ownerLogin);
ownerRouter.post("/forgotpassword", forgotPassword);
ownerRouter.post("/resetpassword", resetPassword);
ownerRouter.get("/", ownerProtect, getOwner);
ownerRouter.patch("/", ownerProtect, updateOwner);
ownerRouter.delete("/", ownerProtect, ownerDelete);

export default ownerRouter;
