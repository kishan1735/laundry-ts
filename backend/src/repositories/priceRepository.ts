import { AppDataSource } from "../db";
import { Price } from "../entities/Price";

export const priceRepository = AppDataSource.getRepository(Price);
