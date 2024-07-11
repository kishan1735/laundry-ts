import amqlib, { type Channel } from "amqplib";
import { transporter } from "./nodemailer";
import { env } from "./schema";

export let producer: Channel;

(async () => {
	const connection = await amqlib.connect(
		"amqp://rabbitmq:5672",
		"heartbeat=60",
	);
	console.log("Connected to RabbitMQ");

	process.once("SIGINT", async () => {
		console.log("got sigint, closing connection");
		await connection.close();
	});

	producer = await connection.createChannel();

	producer.on("close", () => {
		console.log("\nProducer channel closed");
	});

	await producer.assertQueue("email_queue");

	const consumer = await connection.createChannel();

	consumer.on("close", () => {
		console.log("\nConsumer channel closed");
	});

	consumer.consume(
		"email_queue",
		async (data) => {
			const mailOptions = JSON.parse(data.content.toString());

			await transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
				} else {
					console.log("Email sent: ", info.response);
				}
			});
		},
		{ noAck: true },
	);
})();

export const sendVerificationMail = async (
	email: string,
	resetToken: string,
) => {
	try {
		const mailOptions = {
			from: env.EMAIL,
			to: email,
			subject: "Password Reset OTP",
			html: `<h1>Your reset password</h1><p>${resetToken}</p>`,
		};

		producer.sendToQueue(
			"email_queue",
			Buffer.from(JSON.stringify(mailOptions)),
		);
	} catch (err) {
		throw new Error(err);
	}
};
