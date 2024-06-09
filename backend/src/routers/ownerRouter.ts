import express from "express";
import {
	getOwner,
	ownerLogin,
	ownerProtect,
	ownerSignup,
} from "../controllers/ownerController";

const ownerRouter = express.Router();

ownerRouter.post("/signup", ownerSignup);
ownerRouter.post("/login", ownerLogin);
ownerRouter.get("/", ownerProtect, getOwner);

export default ownerRouter;
