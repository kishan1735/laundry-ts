import { AppDataSource } from "../db";
import { Owner } from "../entities/Owner";

export const ownerRepository = AppDataSource.getRepository(Owner);
