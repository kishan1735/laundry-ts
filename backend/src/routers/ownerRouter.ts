import express from "express";
import {
	getOwner,
	ownerLogin,
	ownerProtect,
	ownerSignup,
	updateOwner,
} from "../controllers/ownerController";

const ownerRouter = express.Router();

ownerRouter.post("/signup", ownerSignup);
ownerRouter.post("/login", ownerLogin);
ownerRouter.get("/", ownerProtect, getOwner);
ownerRouter.patch("/", ownerProtect, updateOwner);

export default ownerRouter;
