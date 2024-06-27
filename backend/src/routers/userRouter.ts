import express from "express";
import {
	getUser,
	userDelete,
	userProtect,
	userUpdate,
} from "../controllers/userController";
import { getAllShops, getShopById } from "../controllers/shopController";
import { createLaundry } from "../controllers/laundryController";

const userRouter = express.Router();

userRouter.get("/get", userProtect, getUser);
userRouter.patch("/update", userProtect, userUpdate);
userRouter.delete("/delete", userProtect, userDelete);
userRouter.get("/shop", userProtect, getAllShops);
userRouter.get("/shop/:id/get", userProtect, getShopById);
userRouter.post("/shop/:id/laundry/create", userProtect, createLaundry);

export default userRouter;
