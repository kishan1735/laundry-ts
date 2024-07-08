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
	deleteShop,
	getAllOwnerShops,
	getShopById,
	updateShop,
} from "../controllers/shopController";
import {
	getLaundryById,
	getShopLaundry,
	updateStatus,
} from "../controllers/laundryController";

const ownerRouter = express.Router();

ownerRouter.post("/signup", ownerSignup);
ownerRouter.post("/login", ownerLogin);
ownerRouter.post("/forgotpassword", forgotPassword);
ownerRouter.post("/resetpassword", resetPassword);
ownerRouter.get("/get", ownerProtect, getOwner);
ownerRouter.patch("/update", ownerProtect, updateOwner);
ownerRouter.delete("/delete", ownerProtect, ownerDelete);
ownerRouter.get("/shop", ownerProtect, getAllOwnerShops);
ownerRouter.post("/shop/create", ownerProtect, createShop);
ownerRouter.get("/shop/:id/get", ownerProtect, getShopById);
ownerRouter.patch("/shop/:id/update", ownerProtect, updateShop);
ownerRouter.delete("/shop/:id/delete", ownerProtect, deleteShop);
ownerRouter.get("/shop/:id/laundry/get", ownerProtect, getShopLaundry);
ownerRouter.get("/laundry/:id", ownerProtect, getLaundryById);
ownerRouter.patch("/laundry/:id/status/update", ownerProtect, updateStatus);

export default ownerRouter;
