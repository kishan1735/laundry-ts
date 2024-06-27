import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Laundry } from "./Laundry";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", length: 200 })
	name!: string;

	@Column({ type: "varchar", length: 38, unique: true })
	email!: string;

	@Column({ type: "varchar", length: 400 })
	profile!: string;

	@Column({
		name: "phone_number",
		type: "bigint",
		unique: true,
		nullable: true,
	})
	phoneNumber!: number;

	@OneToMany(
		() => Laundry,
		(laundry) => laundry.user,
	)
	laundry!: Laundry[];
}
