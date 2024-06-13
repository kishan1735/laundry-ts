import type { Request } from "express";

export interface OwnerRequest extends Request {
	owner: {
		id: string;
		name: string;
		email: string;
		phoneNumber: number;
	};
}
