import Navbar from "@/components/Navbar";
import type { ErrorResponse, OUpdateFormType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UUpdate() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { register, reset, handleSubmit } = useForm({
		defaultValues: {
			name: "",
			email: "",
			phoneNumber: "",
		},
	});
	const { data, status } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const res = await axios.get("http://127.0.0.1:8000/api/user/get", {
				withCredentials: true,
			});

			return res;
		},
	});
	useEffect(() => {
		if (status === "success") {
			reset({
				name: data.data.user.name,
				email: data.data.user.email,
				phoneNumber: data.data.user.phoneNumber,
			});
		}
	}, [reset, status]);

	const { mutate: updateMutate } = useMutation({
		mutationFn: (data: OUpdateFormType) => {
			return axios.patch("http://127.0.0.1:8000/api/user/update", data, {
				withCredentials: true,
			});
		},
		onSuccess: () => {
			toast.success("User updated successfully");
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: (err: AxiosError<ErrorResponse>) => {
			if (err.response.data.message) toast.error(err.response.data.message);
		},
	});
	const { mutate: deleteMutate } = useMutation({
		mutationFn: () => {
			return axios.delete("http://127.0.0.1:8000/api/user/delete", {
				withCredentials: true,
			});
		},
		onSuccess: () => {
			toast.success("Deleted successfully");
			navigate("/user/login");
		},
		onError: (err: AxiosError<ErrorResponse>) => {
			if (err.response.data.message) toast.error(err.response.data.message);
		},
	});
	const onSubmit: SubmitHandler<OUpdateFormType> = (data) => {
		updateMutate(data);
	};
	const handleDelete = () => {
		console.log("hi");
		deleteMutate();
	};
	return (
		<div
			className="min-h-screen h-full flex flex-col items-center space-y-20"
			id="home"
		>
			<Navbar type="user" />
			<form
				className="bg-black opacity-80 flex flex-col p-12 space-y-6 border-2 border-slate-400"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-white text-3xl uppercase mb-2 mx-auto">
					Update User
				</h1>
				<div className="flex justify-start items-center space-x-48">
					<h1 className="text-xl uppercase font-black text-yellow-200">Name</h1>
					<input
						type="text"
						className="text-lg font-black text-center py-1"
						{...register("name", { required: true })}
					/>
				</div>
				<div className="flex justify-start items-center space-x-20">
					<h1 className="text-xl uppercase font-black text-yellow-200 pr-2">
						Phone Number
					</h1>
					<input
						type="text"
						className="text-lg font-black text-center py-1"
						{...register("phoneNumber", { required: true })}
					/>
				</div>
				<div className="flex justify-center space-x-8 pt-4 pb-2">
					<button
						className="bg-white py-3 px-4 text-xl font-bold uppercase hover:scale-110 duration-400"
						type="submit"
					>
						Update
					</button>
					<button
						className="bg-white py-3 px-4 text-xl font-bold uppercase hover:scale-110 duration-400"
						type="button"
						onClick={handleDelete}
					>
						Delete
					</button>
				</div>
			</form>
		</div>
	);
}

export default UUpdate;
