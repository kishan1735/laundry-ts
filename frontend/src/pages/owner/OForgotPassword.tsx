import type { ErrorResponse } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function OForgotPassword() {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const { mutate } = useMutation({
		mutationFn: (data: { email: string }) => {
			return axios.post("http://127.0.0.1:8000/api/owner/forgotpassword", data);
		},
		onSuccess: () => {
			toast.success("Email sent successfully");
			navigate("/owner/resetpassword");
		},
		onError: (err: AxiosError<ErrorResponse>) => {
			if (err.response.data.message) toast.error(err.response.data.message);
		},
	});
	const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
		mutate({ email: data.email });
	};
	return (
		<div
			className="h-screen
       flex flex-col items-center justify-center pb-4"
			id="home"
		>
			<form
				className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-6 border-2 border-slate-400"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-yellow-200 text-3xl uppercase font-black mb-2 mx-auto">
					Forgot Password
				</h1>
				<div className="flex items-center space-x-6 pb-2 ">
					<h1 className="text-white text-xl uppercase pr-[160px]">Email</h1>
					<input
						type="text"
						className="px-10 py-1 text-lg text-center"
						{...register("email", { required: true })}
					/>
				</div>
				<button
					className="bg-white py-2 px-6 text-lg font-bold uppercase hover:scale-110 duration-400 mx-auto mt-2"
					type="submit"
				>
					Enter
				</button>
			</form>
		</div>
	);
}

export default OForgotPassword;
