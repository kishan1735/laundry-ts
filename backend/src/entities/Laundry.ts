import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Shop } from "./Shop";
import { User } from "./User";
import { OrderStatus } from "../types/types";

@Entity()
export class Laundry {
	@PrimaryGeneratedColumn("increment")
	id!: string;

	@Column({ type: "smallint", default: 0 })
	tshirt!: number;

	@Column({ type: "smallint", default: 0 })
	shirt!: number;

	@Column({ type: "smallint", default: 0 })
	shorts!: number;

	@Column({ type: "smallint", default: 0 })
	towel!: number;

	@Column({ type: "smallint", default: 0 })
	pant!: number;

	@Column({ type: "smallint", default: 0 })
	bedsheet!: number;

	@Column({ type: "smallint", default: 0 })
	cost!: number;

	@Column({ type: "enum", enum: OrderStatus })
	status!: OrderStatus;

	@ManyToOne(
		() => Shop,
		(shop) => shop.laundry,
	)
	shop!: Shop;

	@ManyToOne(
		() => User,
		(user) => user.laundry,
	)
	user!: User;

	@CreateDateColumn({
		name: "created_at",
		type: "timestamptz",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdAt!: Date;
}
