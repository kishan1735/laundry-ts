import Navbar from "@/components/Navbar";
import type { ErrorResponse, ShopPriceType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function OShopUpdate() {
	const { id } = useParams();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const { data, status } = useQuery({
		queryKey: [`owner_shop ${id}`],
		queryFn: () => {
			const res = axios.get(`http://127.0.0.1:8000/api/owner/shop/${id}/get`, {
				withCredentials: true,
			});

			return res;
		},
	});
	const { mutate: updateMutate } = useMutation({
		mutationFn: (data: ShopPriceType) => {
			return axios.patch(
				`http://127.0.0.1:8000/api/owner/shop/${id}/update`,
				data,
				{
					withCredentials: true,
				},
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [`owner_shop ${id}`] });
			queryClient.invalidateQueries({ queryKey: ["owner_shops"] });
			toast.success("Shop updated successfully");
			navigate(`/owner/shop/${id}`);
		},
		onError: (err: AxiosError<ErrorResponse>) => {
			toast.error(err.response.data.message);
		},
	});
	const { mutate: deleteMutate } = useMutation({
		mutationFn: () => {
			return axios.delete(`http://127.0.0.1:8000/api/owner/shop/${id}/delete`, {
				withCredentials: true,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [`owner_shop ${id}`] });
			queryClient.invalidateQueries({ queryKey: ["owner_shops"] });
			toast.success("Shop deleted successfully");
			navigate("/owner/shop");
		},
		onError: (err: AxiosError<ErrorResponse>) => {
			toast.error(err.response.data.message);
		},
	});
	useEffect(() => {
		if (status === "success") {
			reset({
				name: data.data.shop.name,
				address: data.data.shop.address,
				phoneNumber: data.data.shop.phoneNumber,
				price: data.data.shop.price,
			});
		}
	}, [reset, status]);
	const onSubmit: SubmitHandler<ShopPriceType> = (data) => {
		updateMutate(data);
	};

	return (
		<div
			id="home"
			className="min-h-screen h-full flex flex-col space-y-12 items-center"
		>
			<Navbar type="owner" />
			<form
				className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex text-white space-x-8 justify-between">
					<h1 className="text-xl font-black text-yellow-200">Name</h1>
					<input
						type="text"
						className="text-lg font-black text-center text-black"
						{...register("name", { required: true })}
					/>
				</div>
				<div className="flex text-white space-x-8 justify-between">
					<h1 className="text-xl font-black text-yellow-200">Address</h1>
					<input
						type="text"
						className="text-lg font-black text-center text-black"
						{...register("address", { required: true })}
					/>
				</div>
				<div className="flex text-white space-x-8 justify-between pb-4">
					<h1 className="text-xl font-black text-yellow-200">Phone Number</h1>
					<input
						type="text"
						className="text-lg font-black text-center text-black"
						{...register("phoneNumber", { required: true })}
					/>
				</div>
				<div className="flex flex-col text-white space-y-3 border-2 my-2 border-slate-400 py-4">
					<div className="flex text-white justify-around ">
						<div className="flex flex-col text-center">
							<h1 className="uppercase text-lg">Tshirt</h1>
							<input
								type="text"
								className="text-center w-20 text-black bg-white"
								{...register("price.tshirt", {
									required: { value: true, message: "Field is required" },
									setValueAs: (v) => Number.parseInt(v),
									valueAsNumber: true,
									validate: (value) =>
										!Number.isNaN(value) || "Field has to be number",
								})}
							/>
						</div>
						<div className="flex flex-col text-center">
							<h1 className="uppercase text-lg">Shirt</h1>
							<input
								type="text"
								className="text-center w-20 text-black bg-white"
								{...register("price.shirt", {
									required: { value: true, message: "Field is required" },
									setValueAs: (v) => Number.parseInt(v),
									valueAsNumber: true,
									validate: (value) =>
										!Number.isNaN(value) || "Field has to be number",
								})}
							/>
						</div>
						<div className="flex flex-col text-center">
							<h1 className="uppercase text-lg">Shorts</h1>
							<input
								type="text"
								className="text-center w-20 text-black bg-white"
								{...register("price.shorts", {
									required: { value: true, message: "Field is required" },
									setValueAs: (v) => Number.parseInt(v),
									valueAsNumber: true,
									validate: (value) =>
										!Number.isNaN(value) || "Field has to be number",
								})}
							/>
						</div>
					</div>
					<div className="flex text-white justify-around pb-2">
						<div className="flex flex-col text-center ">
							<h1 className="uppercase text-lg">Pant</h1>
							<input
								type="text"
								className="text-center w-20 text-black bg-white"
								{...register("price.pant", {
									required: { value: true, message: "Field is required" },
									setValueAs: (v) => Number.parseInt(v),
									valueAsNumber: true,
									validate: (value) =>
										!Number.isNaN(value) || "Field has to be number",
								})}
							/>
						</div>
						<div className="flex flex-col text-center">
							<h1 className="uppercase text-lg">Towel</h1>
							<input
								type="text"
								className="text-center w-20 text-black bg-white"
								{...register("price.towel", {
									required: { value: true, message: "Field is required" },
									setValueAs: (v) => Number.parseInt(v),
									valueAsNumber: true,
									validate: (value) =>
										!Number.isNaN(value) || "Field has to be number",
								})}
							/>
						</div>
						<div className="flex flex-col text-center items-center">
							<h1 className="uppercase text-lg">Bedsheet</h1>
							<input
								type="text"
								className="text-center w-20 text-black bg-white"
								{...register("price.bedsheet", {
									required: { value: true, message: "Field is required" },
									setValueAs: (v) => Number.parseInt(v),
									valueAsNumber: true,
									validate: (value) =>
										!Number.isNaN(value) || "Field has to be number",
								})}
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-center space-x-8 pt-4 pb-2">
					<button
						className="bg-white py-3 px-4 text-xl font-bold uppercase hover:scale-110 duration-400"
						type="submit"
						onClick={() => {
							console.log(errors);
						}}
					>
						Update
					</button>
					<button
						className="bg-white py-3 px-4 text-xl font-bold uppercase hover:scale-110 duration-400"
						type="button"
						onClick={() => {
							deleteMutate();
						}}
					>
						Delete
					</button>
				</div>
			</form>
		</div>
	);
}
export default OShopUpdate;
