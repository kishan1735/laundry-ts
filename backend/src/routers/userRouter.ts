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
	getUserLaundry,
	getUserShopLaundry,
} from "../controllers/laundryController";
import { userUpdateValidator } from "../types/zodSchema/user";
import { shopByIdValidator } from "../types/zodSchema/shop";
import {
	laundryByIdValidator,
	laundryCreateValidator,
} from "../types/zodSchema/laundry";

const userRouter = express.Router();

userRouter.get("/get", userProtect, getUser);
userRouter.patch("/update", userProtect, userUpdateValidator, userUpdate);
userRouter.delete("/delete", userProtect, userDelete);
userRouter.get("/shop", userProtect, getAllShops);
userRouter.get("/shop/:id/get", userProtect, shopByIdValidator, getShopById);
userRouter.get("/shop/:id/laundry/get", userProtect, getUserShopLaundry);
userRouter.post(
	"/shop/:id/laundry/create",
	userProtect,
	laundryCreateValidator,
	createLaundry,
);
userRouter.get("/laundry/get", userProtect, getUserLaundry);
userRouter.get(
	"/laundry/:id",
	userProtect,
	laundryByIdValidator,
	getLaundryById,
);
export default userRouter;
