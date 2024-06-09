export interface ErrorResponse {
	status: string;
	message: string;
}

export interface OSignupFormType {
	name: string;
	phone: string;
	email: string;
	password: string;
}

export interface OLoginFormType {
	email: string;
	password: string;
}

export interface OUpdateFormType {
	name: string;
	phoneNumber: string;
	email: string;
}
