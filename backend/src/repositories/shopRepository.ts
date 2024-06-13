import { AppDataSource } from "../db";
import { Shop } from "../entities/Shop";

export const shopRepository = AppDataSource.getRepository(Shop);
