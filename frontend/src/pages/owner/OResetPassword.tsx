import type { ErrorResponse } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function OResetPassword() {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const { mutate } = useMutation({
		mutationFn: (data: { password: string; token: string }) => {
			return axios.post("http://127.0.0.1:8000/api/owner/resetpassword", data);
		},
		onSuccess: () => {
			toast.success("Password updated successfully");
			navigate("/owner/login");
		},
		onError: (err: AxiosError<ErrorResponse>) => {
			if (err.response.data.message) toast.error(err.response.data.message);
		},
	});
	const onSubmit: SubmitHandler<{ password: string; token: string }> = async (
		data,
	) => {
		mutate(data);
	};
	return (
		<div
			className="h-screen flex flex-col items-center justify-center pb-4"
			id="home"
		>
			<form
				className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-6 border-2 border-slate-400 mt-12"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-yellow-200 text-3xl uppercase font-black mb-2 mx-auto">
					Reset Password
				</h1>
				<div className="flex items-center space-x-6 ">
					<h1 className="text-white text-xl uppercase pr-5">
						Verification Code
					</h1>
					<input
						type="text"
						className="px-10 py-1"
						{...register("token", { required: true })}
					/>
				</div>
				<div className="flex items-center space-x-6 pb-2">
					<h1 className="text-white text-xl uppercase pr-[111px]">Password</h1>
					<input
						type="password"
						className="px-10 py-1"
						{...register("password", { required: true })}
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

export default OResetPassword;
