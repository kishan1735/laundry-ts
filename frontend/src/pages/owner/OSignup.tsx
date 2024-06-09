import { useMutation } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";
import axios, { type AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { ErrorResponse, OSignupFormType } from "@/types/types";

function OSignup() {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const { mutate } = useMutation({
		mutationFn: (data: OSignupFormType) => {
			return axios.post("http://127.0.0.1:8000/api/owner/signup", data, {
				headers: { "Content-Type": "application/json" },
			});
		},
		onSuccess: () => {
			toast.success("New Owner Created");
			navigate("/owner/login");
		},
		onError: (err: AxiosError<ErrorResponse>) => {
			if (err.response.data.message) toast.error(err.response.data.message);
		},
	});
	const onSubmit: SubmitHandler<OSignupFormType> = (data) => {
		mutate(data);
	};
	return (
		<form
			className="h-screen flex justify-center items-center"
			id="home"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400">
				<h1 className="text-white text-3xl uppercase font-black mb-2">
					OWNER SIGNUP
				</h1>
				<div className="flex items-center space-x-6">
					<h1 className="text-white text-xl uppercase pr-[152px]">Name</h1>
					<input
						type="text"
						className="px-8 py-1 text-center"
						{...register("name")}
					/>
				</div>
				<div className="flex items-center space-x-6">
					<h1 className="text-white text-xl uppercase pr-[150px]">Email</h1>
					<input
						type="text"
						className="px-8 py-1 text-center"
						{...register("email")}
					/>
				</div>
				<div className="flex items-center space-x-6">
					<h1 className="text-white text-xl uppercase pr-[47px]">
						Phone Number
					</h1>
					<input
						type="text"
						className="px-8 py-1 text-center"
						{...register("phoneNumber")}
					/>
				</div>
				<div className="flex items-center space-x-6">
					<h1 className="text-white text-xl uppercase pr-[102px]">Password</h1>
					<input
						type="password"
						className="px-8 py-1 text-center"
						{...register("password")}
					/>
				</div>
				<div className="flex items-center space-x-6 pb-2">
					<h1 className="text-white text-xl uppercase">Password Confirm</h1>
					<input
						type="password"
						className="px-8 py-1 text-center"
						{...register("passwordConfirm")}
					/>
				</div>

				<button
					className="bg-white mx-16 py-1 text-lg font-bold uppercase hover:scale-110 duration-400"
					type="submit"
				>
					SignUp
				</button>
			</div>
		</form>
	);
}

export default OSignup;
