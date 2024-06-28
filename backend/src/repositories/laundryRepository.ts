import { AppDataSource } from "../db";
import { Laundry } from "../entities/Laundry";

export const laundryRepository = AppDataSource.getRepository(Laundry);
