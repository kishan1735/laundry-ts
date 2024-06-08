import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Owner {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", length: 200 })
	name!: string;

	@Column({ type: "varchar", length: 200, unique: true })
	email!: string;

	@Column({ type: "varchar", length: 38, unique: true, select: false })
	password!: string;

	@Column({ name: "phone_number", type: "bigint", unique: true })
	phoneNumber!: number;

	@Column({
		name: "password_reset_token",
		type: "varchar",
		length: 200,
		select: false,
	})
	passwrdResetToken!: string;

	@Column({
		name: "password_reset_expires",
		type: "timestamptz",
		select: false,
	})
	passwordResetExpires!: Date;
}
