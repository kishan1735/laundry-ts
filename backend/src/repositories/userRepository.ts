import { AppDataSource } from "../db";
import { User } from "../entities/User";

export const userRepository = AppDataSource.getRepository(User);
