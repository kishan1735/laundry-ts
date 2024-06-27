import type { Response } from "express";
import { OrderStatus, type UserRequest } from "../types/types";
import { AppDataSource } from "../db";
import { Shop } from "../entities/Shop";
import { Laundry } from "../entities/Laundry";
import { User } from "../entities/User";

export const createLaundry = async (req: UserRequest, res: Response) => {
	try {
		const { id } = req.params;
		const { list } = req.body;
		const queryRunner = AppDataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		const shop = await queryRunner.manager
			.createQueryBuilder(Shop, "shop")
			.leftJoinAndSelect("shop.price", "price")
			.where("shop.id=:id", { id })
			.getOne();

		const cost = Object.entries(list).reduce((acc, el: [string, number]) => {
			if (!Number.isNaN(el[1])) return acc + el[1] * shop.price[el[0]];
		}, 0);

		const laundry = await queryRunner.manager
			.createQueryBuilder()
			.insert()
			.into(Laundry)
			.values({
				shirt: list.shirt || 0,
				tshirt: list.tshirt || 0,
				shorts: list.shorts || 0,
				pant: list.pant || 0,
				towel: list.towel || 0,
				bedsheet: list.price || 0,
				cost,
				status: OrderStatus.Placed,
			})
			.returning("*")
			.execute();
		await queryRunner.manager
			.createQueryBuilder()
			.relation(User, "laundry")
			.of(req.user.id)
			.add(laundry.raw[0]);
		await queryRunner.manager
			.createQueryBuilder()
			.relation(Shop, "laundry")
			.of(shop.id)
			.add(laundry.raw[0]);
		await queryRunner.commitTransaction();
		return res
			.status(201)
			.json({ status: "success", message: "Laundry created successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ status: "failed", message: err.message });
	}
};
