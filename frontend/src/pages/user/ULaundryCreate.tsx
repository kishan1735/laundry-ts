import Navbar from "@/components/Navbar";
import type { ErrorResponse, LaundryType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function ULaundryCreate() {
	const { id } = useParams();
	const [price, setPrice] = useState(0);
	const { register, handleSubmit, watch } = useForm();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { data, status } = useQuery({
		queryKey: [`user_shop ${id}`],
		queryFn: () => {
			const res = axios.get(`http://127.0.0.1:8000/api/user/shop/${id}/get`, {
				withCredentials: true,
			});

			return res;
		},
	});
	const calculatePrice = () => {
		const priceObject = data.data.shop.price;
		const count = watch();
		setPrice(
			Object.entries(count).reduce((acc, el) => {
				return acc + el[1] * priceObject[el[0]];
			}, 0),
		);
	};
	const { mutate } = useMutation({
		mutationFn: (data: { list: LaundryType }) => {
			return axios.post(
				`http://127.0.0.1:8000/api/user/shop/${id}/laundry/create`,
				data,
				{ withCredentials: true },
			);
		},
		onSuccess: () => {
			toast.success("Laundry created successfully");
			queryClient.invalidateQueries({ queryKey: [`user_shop_laundry ${id}`] });
			navigate(`/user/shop/${id}/laundry`);
		},
		onError: (err: AxiosError<ErrorResponse>) => {
			if (err.response.data.message) toast.error(err.response.data.message);
		},
	});
	const onSubmit: SubmitHandler<LaundryType> = (data) => {
		mutate({ list: data });
	};
	return (
		<div
			id="home"
			className="min-h-screen h-full flex flex-col space-y-6 items-center pb-4"
		>
			<Navbar type="user" />
			<div className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400">
				{status === "success" ? (
					<>
						<h1 className="text-white text-2xl uppercase font-black mb-2 text-center">
							{data.data.shop.name}
						</h1>
						<h1 className="text-yellow-200 text-xl uppercase font-black pb-2 mx-auto">
							Set Number of Clothes
						</h1>
						<form
							className="flex flex-col text-white justify-around space-y-4"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="flex justify-between text-center px-12">
								<h1 className="uppercase text-lg">Tshirt</h1>
								<input
									type="text"
									{...register("tshirt", {
										required: { value: true, message: "Field is required" },
										setValueAs: (v) => Number.parseInt(v),
										valueAsNumber: true,
										validate: (value) =>
											!Number.isNaN(value) || "Field has to be number",
									})}
									className="text-center w-20 text-black bg-white opacity-90"
								/>
							</div>
							<div className="flex justify-between text-center px-12">
								<h1 className="uppercase text-lg">Shirt</h1>
								<input
									type="text"
									{...register("shirt", {
										required: { value: true, message: "Field is required" },
										setValueAs: (v) => Number.parseInt(v),
										valueAsNumber: true,
										validate: (value) =>
											!Number.isNaN(value) || "Field has to be number",
									})}
									className="text-center w-20 text-black bg-white opacity-90"
								/>
							</div>
							<div className="flex justify-between text-center px-12">
								<h1 className="uppercase text-lg">Shorts</h1>
								<input
									type="text"
									{...register("shorts", {
										required: { value: true, message: "Field is required" },
										setValueAs: (v) => Number.parseInt(v),
										valueAsNumber: true,
										validate: (value) =>
											!Number.isNaN(value) || "Field has to be number",
									})}
									className="text-center w-20 text-black bg-white opacity-90"
								/>
							</div>
							<div className="flex justify-between text-center  px-12">
								<h1 className="uppercase text-lg">Pant</h1>
								<input
									type="text"
									{...register("pant", {
										required: { value: true, message: "Field is required" },
										setValueAs: (v) => Number.parseInt(v),
										valueAsNumber: true,
										validate: (value) =>
											!Number.isNaN(value) || "Field has to be number",
									})}
									className="text-center w-20 text-black bg-white opacity-90"
								/>
							</div>
							<div className="flex justify-between text-center px-12">
								<h1 className="uppercase text-lg">Towel</h1>
								<input
									type="text"
									{...register("towel", {
										required: { value: true, message: "Field is required" },
										setValueAs: (v) => Number.parseInt(v),
										valueAsNumber: true,
										validate: (value) =>
											!Number.isNaN(value) || "Field has to be number",
									})}
									className="text-center w-20 text-black bg-white opacity-90"
								/>
							</div>
							<div className="flex justify-between text-center px-12 pb-2">
								<h1 className="uppercase text-lg">Bedsheet</h1>
								<input
									type="text"
									{...register("bedsheet", {
										required: { value: true, message: "Field is required" },
										setValueAs: (v) => Number.parseInt(v),
										valueAsNumber: true,
										validate: (value) =>
											!Number.isNaN(value) || "Field has to be number",
									})}
									className="text-center w-20 text-black bg-white opacity-90"
								/>
							</div>
							{price > 0 ? (
								<h1 className="text-yellow-200 text-xl uppercase font-black pb-2 mx-auto">
									Price : {price}
								</h1>
							) : (
								""
							)}
							<button
								className="bg-white mx-16 py-1 px-2 text-lg font-bold uppercase hover:scale-110 duration-400 text-black"
								type="button"
								onClick={calculatePrice}
							>
								Calculate Price
							</button>
							<button
								className="bg-white mx-16 py-1 px-2 text-lg font-bold uppercase hover:scale-110 duration-400 text-black"
								type="submit"
							>
								Create Laundry
							</button>
						</form>
					</>
				) : (
					<h1 className="text-white text-3xl uppercase mb-2 mx-auto">
						Loading
					</h1>
				)}
			</div>
		</div>
	);
}

export default ULaundryCreate;
