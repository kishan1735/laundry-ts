import { z } from "zod";
import { validate } from "../../helpers/zodValidate";

const userUpdateSchema = z.object({
	body: z.object({
		name: z.string(),
		phoneNumber: z
			.string()
			.regex(/^\d{10}$/, "Phone number must be a 10 digit number"),
	}),
});

export const userUpdateValidator = validate(userUpdateSchema);
