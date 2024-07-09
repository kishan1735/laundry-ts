import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "./entities/User";
import { Owner } from "./entities/Owner";
import { Shop } from "./entities/Shop";
import { Price } from "./entities/Price";
import { Laundry } from "./entities/Laundry";
import { env } from "./config/schema";

export const AppDataSource = new DataSource({
	type: "postgres",
	url: `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.POSTGRES_DB}`,
	synchronize: true,
	logging: false,
	entities: [User, Owner, Shop, Price, Laundry],
	migrations: [],
	subscribers: [],
});
