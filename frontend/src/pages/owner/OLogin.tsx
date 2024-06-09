import type { ErrorResponse, OLoginFormType } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function OLogin() {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const [cookies, setCookie, removeCookie] = useCookies([
		"access_token",
		"refresh_token",
	]);
	const { mutate } = useMutation({
		mutationFn: (data: OLoginFormType) => {
			return axios.post("http://127.0.0.1:8000/api/owner/login", data, {
				headers: { "Content-Type": "application/json" },
			});
		},
		onSuccess: (res) => {
			toast.success("Login successful");
			setCookie("access_token", res.data.accessToken);
			setCookie("refresh_token", res.data.refreshToken);
			navigate("/owner/dashboard");
		},
		onError: (err: AxiosError<ErrorResponse>) => {
			if (err.response.data.message) toast.error(err.response.data.message);
		},
	});
	const onSubmit: SubmitHandler<OLoginFormType> = (data) => {
		mutate(data);
	};
	return (
		<div className="min-h-screen h-full flex flex-col items-center" id="home">
			<>
				<nav className="bg-black opacity-80 flex w-full justify-between py-4 px-6 mb-4">
					<h1
						className="text-yellow-200 uppercase font-black text-3xl flex items-center cursor-pointer"
						onClick={() => navigate("/")}
					>
						<p className="pr-1">LaundryTS</p> <p className="pb-1"> 🧺</p>
					</h1>
				</nav>
				<form
					className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400 mt-12"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="text-white text-3xl uppercase font-black mb-2">
						Owner Login
					</h1>
					<div className="flex items-center space-x-6">
						<h1 className="text-white text-xl uppercase pr-12">Email</h1>
						<input type="text" className="px-6 py-1" {...register("email")} />
					</div>
					<div className="flex items-center space-x-6 pb-2">
						<h1 className="text-white text-xl uppercase">Password</h1>
						<input
							type="password"
							className="px-6 py-1"
							{...register("password")}
						/>
					</div>
					<button
						className="bg-white mx-16 py-1 text-lg font-bold uppercase hover:scale-110 duration-400"
						type="submit"
					>
						Login
					</button>
					<h1 className="text-white text-center">
						New User -{" "}
						<Link
							to="/owner/signup"
							className="underline uppercase text-yellow-200"
						>
							SignUp
						</Link>{" "}
						to Get Started
					</h1>
					<button
						className="bg-white mx-16 py-1 text-lg font-bold uppercase hover:scale-110 duration-400 px-8"
						//   onClick={() => navigate("/owner/forgotpassword")}
					>
						Forgot Password
					</button>
				</form>
			</>
		</div>
	);
}

export default OLogin;
