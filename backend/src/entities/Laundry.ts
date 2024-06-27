import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shop } from "./Shop";
import { User } from "./User";

@Entity()
export class Laundry {
	@PrimaryGeneratedColumn("uuid")
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

	@Column({ type: "enum", enum: ["placed", "accepted", "ready", "delivered"] })
	status!: ["placed", "accepted", "ready", "delivered"];

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
}
