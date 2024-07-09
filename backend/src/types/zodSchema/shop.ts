import { z } from "zod";
import { validate } from "../../helpers/zodValidate";

const shopCreateSchema = z.object({
	body: z.object({
		name: z.string(),
		phoneNumber: z
			.string()
			.regex(/^\d{10}$/, "Phone number must be a 10 digit number"),
		address: z.string().min(1),
		tshirt: z.coerce.number({ message: "Value has to be number" }),
		shirt: z.coerce.number({ message: "Value has to be number" }),
		shorts: z.coerce.number({ message: "Value has to be number" }),
		pant: z.coerce.number({ message: "Value has to be number" }),
		towel: z.coerce.number({ message: "Value has to be number" }),
		bedsheet: z.coerce.number({ message: "Value has to be number" }),
	}),
});

export const shopCreateValidator = validate(shopCreateSchema);

const shopUpdateSchema = z.object({
	params: z.object({ id: z.string().min(1) }),
	body: z.object({
		name: z.string(),
		phoneNumber: z
			.string()
			.regex(/^\d{10}$/, "Phone number must be a 10 digit number"),
		address: z.string().min(1),
		price: z.object({
			tshirt: z.coerce.number({ message: "Value has to be number" }),
			shirt: z.coerce.number({ message: "Value has to be number" }),
			shorts: z.coerce.number({ message: "Value has to be number" }),
			pant: z.coerce.number({ message: "Value has to be number" }),
			towel: z.coerce.number({ message: "Value has to be number" }),
			bedsheet: z.coerce.number({ message: "Value has to be number" }),
		}),
	}),
});

export const shopUpdateValidator = validate(shopUpdateSchema);

const shopByIdSchema = z.object({
	params: z.object({ id: z.string().min(1) }),
});

export const shopByIdValidator = validate(shopByIdSchema);
