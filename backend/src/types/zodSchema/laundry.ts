import { z } from "zod";
import { validate } from "../../helpers/zodValidate";

const laundryCreateSchema = z.object({
	params: z.object({ id: z.string().min(1) }),
	body: z.object({
		list: z.object({
			tshirt: z.coerce.number({ message: "Value has to be number" }).optional(),
			shirt: z.coerce.number({ message: "Value has to be number" }).optional(),
			shorts: z.coerce.number({ message: "Value has to be number" }).optional(),
			pant: z.coerce.number({ message: "Value has to be number" }).optional(),
			towel: z.coerce.number({ message: "Value has to be number" }).optional(),
			bedsheet: z.coerce
				.number({ message: "Value has to be number" })
				.optional(),
		}),
	}),
});

export const laundryCreateValidator = validate(laundryCreateSchema);

const laundryByIdSchema = z.object({
	params: z.object({ id: z.string().min(1) }),
});

export const laundryByIdValidator = validate(laundryByIdSchema);

const statusUpdateSchema = z.object({
	params: z.object({ id: z.string().min(1) }),
	body: z.object({
		status: z.enum(["placed", "accepted", "ready", "delivered"]),
	}),
});

export const statusUpdateValidator = validate(statusUpdateSchema);
