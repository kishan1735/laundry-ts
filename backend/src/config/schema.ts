import z from "zod";

export const serverSchema = z.object({
	FRONTEND_URL: z.string().url().min(1),
	BACKEND_PORT: z.coerce.number().default(8000),
	NODE_ENV: z.enum(["development", "production"]),
	API_DOMAIN: z.string().url().min(1),
	POSTGRES_USER: z.string().min(1),
	PGUSER: z.string().min(1),
	DB_HOST: z.string().min(1),
	DB_PORT: z.coerce.number().default(5432),
	POSTGRES_PASSWORD: z.string().min(1),
	POSTGRES_DB: z.string().min(1),
	ACCESS_SECRET: z.string().min(1),
	REFRESH_SECRET: z.string().min(1),
	EMAIL: z.string().email().min(3),
	APP_PASSWORD: z.string().min(1),
	GOOGLE_CLIENT_ID: z.string().min(1),
	GOOGLE_CLIENT_SECRET: z.string().min(1),
});

const serverEnv = serverSchema.safeParse(process.env);

export const formatErrors = (
	errors: z.ZodFormattedError<Map<string, string>, string>,
) =>
	Object.entries(errors)
		.map(([name, value]) => {
			if (value && "_errors" in value)
				return `${name}: ${value._errors.join(", ")}\n`;
		})
		.filter(Boolean);

if ("error" in serverEnv) {
	console.error(
		"Invalid environment variables:\n",
		...formatErrors(serverEnv.error.format()),
	);
	process.exit(1);
}

export const env = serverEnv.data;
