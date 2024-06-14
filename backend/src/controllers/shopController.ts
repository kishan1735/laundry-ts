import type { Response } from "express";
import { Shop } from "../entities/Shop";
import { Price } from "../entities/Price";
import { Owner } from "../entities/Owner";
import type { OwnerRequest } from "../types/types";
import { AppDataSource } from "../db";
import { ownerRepository } from "../repositories/ownerRepository";

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
			.values({
				name,
				address,
				phoneNumber: +phoneNumber,
				satisfied: 0,
				unsatisfied: 0,
			})
			.returning("*")
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
			.returning("*")
			.execute();

		const owner = await queryRunner.manager
			.createQueryBuilder(Owner, "owner")
			.where("owner.id=:id", { id: req.owner.id })
			.getOne();
		await queryRunner.manager
			.createQueryBuilder()
			.relation(Shop, "price")
			.of(shop.raw[0].id)
			.set(price.raw[0]);
		await queryRunner.manager
			.createQueryBuilder()
			.relation(Owner, "shops")
			.of(owner)
			.add(shop.raw[0]);
		await queryRunner.commitTransaction();
		return res
			.status(201)
			.json({ status: "success", message: "Shop created successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ status: "failed", message: err.message });
	}
};

export const getAllOwnerShops = async (req: OwnerRequest, res: Response) => {
	try {
		const owner = await ownerRepository
			.createQueryBuilder("owner")
			.leftJoinAndSelect("owner.shops", "shop")
			.where("owner.id=:id", { id: req.owner.id })
			.leftJoinAndSelect("shop.price", "price")
			.getOne();
		return res.status(200).json({ status: "success", shops: owner.shops });
	} catch (err) {
		res
			.status(500)
			.json({ status: "failed", message: "Internal server error" });
	}
};
