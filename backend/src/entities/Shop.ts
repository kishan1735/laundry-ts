import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Price } from "./Price";
import { Owner } from "./Owner";

@Entity()
export class Shop {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", length: 200 })
	name!: string;

	@Column({ name: "contact_number", type: "bigint", unique: true })
	phoneNumber!: number;

	@Column({ type: "varchar", length: 300 })
	address!: string;

	@Column({ type: "smallint" })
	satisfied!: number;

	@Column({ type: "smallint" })
	unsatisfied!: number;

	@ManyToOne(
		() => Owner,
		(owner) => owner.shops,
	)
	owner!: Owner;

	@OneToOne(() => Price)
	@JoinColumn()
	price!: Price;
}
