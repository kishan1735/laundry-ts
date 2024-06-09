export interface ErrorResponse {
	status: string;
	message: string;
}

export interface OSignupFormType {
	name: string;
	phone: string;
	email: string;
	password: string;
	passwordConfirm: string;
}

export interface OLoginFormType {
	email: string;
	password: string;
}
