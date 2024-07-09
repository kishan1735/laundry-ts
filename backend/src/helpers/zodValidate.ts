import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";

export const validate =
	(schema: AnyZodObject) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			return next();
		} catch (err) {
			const message = JSON.parse(err.message)
				.map((el, i) => `${i + 1}: ${el.message}`)
				.reduce(
					(acc: string, el: string, i: number) =>
						`${acc}${i === 0 ? "" : "\n \t"} ${el}`,
					"",
				);

			return res.status(400).json({ status: "failed", message });
		}
	};
