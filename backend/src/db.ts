import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "./entities/User";
import { Owner } from "./entities/Owner";
import { Shop } from "./entities/Shop";
import { Price } from "./entities/Price";
import { Laundry } from "./entities/Laundry";

export const AppDataSource = new DataSource({
	type: "postgres",
	url: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.POSTGRES_DB}`,
	synchronize: true,
	logging: false,
	entities: [User, Owner, Shop, Price, Laundry],
	migrations: [],
	subscribers: [],
});
