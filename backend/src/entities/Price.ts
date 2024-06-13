import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Price {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "smallint", default: 0, nullable: true })
	tshirt!: number;

	@Column({ type: "smallint", default: 0, nullable: true })
	shirt!: number;

	@Column({ type: "smallint", default: 0, nullable: true })
	shorts!: number;

	@Column({ type: "smallint", default: 0, nullable: true })
	towel!: number;

	@Column({ type: "smallint", default: 0, nullable: true })
	pant!: number;

	@Column({ type: "smallint", default: 0, nullable: true })
	bedsheet!: number;
}
