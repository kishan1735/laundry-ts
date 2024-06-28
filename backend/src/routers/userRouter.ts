import express from "express";
import {
	getUser,
	userDelete,
	userProtect,
	userUpdate,
} from "../controllers/userController";
import { getAllShops, getShopById } from "../controllers/shopController";
import {
	createLaundry,
	getLaundryById,
	getUserShopLaundry,
} from "../controllers/laundryController";

const userRouter = express.Router();

userRouter.get("/get", userProtect, getUser);
userRouter.patch("/update", userProtect, userUpdate);
userRouter.delete("/delete", userProtect, userDelete);
userRouter.get("/shop", userProtect, getAllShops);
userRouter.get("/shop/:id/get", userProtect, getShopById);
userRouter.get("/shop/:id/laundry/get", userProtect, getUserShopLaundry);
userRouter.post("/shop/:id/laundry/create", userProtect, createLaundry);
userRouter.get("/laundry/:laundryId", userProtect, getLaundryById);
export default userRouter;
