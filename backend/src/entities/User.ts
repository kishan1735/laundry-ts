import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", length: 200 })
	name!: string;

	@Column({ type: "varchar", length: 38, unique: true })
	email!: string;

	@Column({ name: "phone_number", type: "bigint", unique: true })
	phoneNumber!: number;

	@Column({ type: "varchar", length: 300 })
	address!: string;
}
