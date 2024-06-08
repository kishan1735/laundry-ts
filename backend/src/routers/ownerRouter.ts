import express from "express";
import { ownerLogin, ownerSignup } from "../controllers/ownerController";

const ownerRouter = express.Router();

ownerRouter.post("/signup", ownerSignup);
ownerRouter.post("/login", ownerLogin);

export default ownerRouter;
