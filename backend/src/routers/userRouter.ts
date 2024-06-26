import express from "express";
import {
	getUser,
	userDelete,
	userProtect,
	userUpdate,
} from "../controllers/userController";
import { getAllShops } from "../controllers/shopController";

const userRouter = express.Router();

userRouter.get("/get", userProtect, getUser);
userRouter.patch("/update", userProtect, userUpdate);
userRouter.delete("/delete", userProtect, userDelete);
userRouter.get("/shop", getAllShops);

export default userRouter;
