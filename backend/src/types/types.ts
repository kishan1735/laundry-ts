import type { Request } from "express";

export interface OwnerRequest extends Request {
	owner: {
		id: string;
		name: string;
		email: string;
		phoneNumber: number;
	};
}

export interface UserRequest extends Request {
	user: {
		id: string;
		name: string;
		email: string;
		profile: string;
		address?: string;
		phoneNumber?: number;
	};
}
