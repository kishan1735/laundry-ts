import type { Response } from "express";
import { Shop } from "../entities/Shop";
import { Price } from "../entities/Price";
import { Owner } from "../entities/Owner";
import type { OwnerRequest } from "../types/types";
import { AppDataSource } from "../db";

export const createShop = async (req: OwnerRequest, res: Response) => {
	try {
		const queryRunner = AppDataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		const {
			name,
			phoneNumber,
			address,
			tshirt,
			shirt,
			pant,
			shorts,
			towel,
			bedsheet,
		} = req.body;
		if (!name || !address || !phoneNumber) {
			return res.status(400).json({
				status: "failed",
				message: "You are missing a required field",
			});
		}
		const shop = await queryRunner.manager
			.createQueryBuilder()
			.insert()
			.into(Shop)
			.values({ name, address, phoneNumber: +phoneNumber })
			.execute();
		const price = await queryRunner.manager
			.createQueryBuilder()
			.insert()
			.into(Price)
			.values({
				shirt: +shirt,
				tshirt: +tshirt,
				shorts: +shorts,
				pant: +pant,
				towel: +towel,
				bedsheet: +bedsheet,
			})
			.execute();
		const owner = await queryRunner.manager
			.createQueryBuilder(Owner, "owner")
			.where("owner.id=:id", { id: req.owner.id })
			.getOne();
		await queryRunner.manager
			.createQueryBuilder()
			.relation(Shop, "price")
			.of(shop)
			.add(price);
		await queryRunner.manager
			.createQueryBuilder()
			.relation(Owner, "shops")
			.of(owner)
			.add(shop);
		await queryRunner.commitTransaction();
		return res
			.status(201)
			.json({ status: "success", message: "Shop created successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ status: "failed", message: err.message });
	}
};
