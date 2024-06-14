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
import {
	createShop,
	getAllOwnerShops,
	getShopById,
} from "../controllers/shopController";

const ownerRouter = express.Router();

ownerRouter.post("/signup", ownerSignup);
ownerRouter.post("/login", ownerLogin);
ownerRouter.post("/forgotpassword", forgotPassword);
ownerRouter.post("/resetpassword", resetPassword);
ownerRouter.get("/", ownerProtect, getOwner);
ownerRouter.patch("/", ownerProtect, updateOwner);
ownerRouter.delete("/", ownerProtect, ownerDelete);
ownerRouter.get("/shop", ownerProtect, getAllOwnerShops);
ownerRouter.post("/shop/create", ownerProtect, createShop);
ownerRouter.get("/shop/:id", ownerProtect, getShopById);

export default ownerRouter;
