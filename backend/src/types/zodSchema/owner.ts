import { z } from "zod";
import { validate } from "../../helpers/zodValidate";

const ownerSignupSchema = z.object({
	body: z.object({
		name: z.string(),
		phoneNumber: z
			.string()
			.regex(/^\d{10}$/, "Phone number must be a 10 digit number"),
		email: z.string().email().min(1),
		password: z.string().min(1),
	}),
});

export const ownerSignupValidator = validate(ownerSignupSchema);

const ownerLoginSchema = z.object({
	body: z.object({
		email: z.string().email().min(1),
		password: z.string().min(1),
	}),
});

export const ownerLoginValidator = validate(ownerLoginSchema);

const ownerUpdateSchema = z.object({
	body: z.object({
		name: z.string(),
		phoneNumber: z
			.string()
			.regex(/^\d{10}$/, "Phone number must be a 10 digit number"),
		email: z.string().email().min(1),
	}),
});

export const ownerUpdateValidator = validate(ownerUpdateSchema);

const forgotPasswordSchema = z.object({
	body: z.object({
		email: z.string().email().min(1),
	}),
});

export const forgotPasswordValidator = validate(forgotPasswordSchema);

const resetPasswordSchema = z.object({
	body: z.object({
		password: z.string().min(1),
		token: z.string().min(1),
	}),
});

export const resetPasswordValidator = validate(resetPasswordSchema);
