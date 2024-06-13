import { useForm, type SubmitHandler } from "react-hook-form";

function OShopCreate() {
	const { register, handleSubmit } = useForm();
	const onSubmit: SubmitHandler<any> = (data) => {
		console.log(data);
	};
	return (
		<div
			id="home"
			className="h-screen flex flex-col space-y-4 items-center justify-center"
		>
			<form
				className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-white text-3xl uppercase font-black mb-2">
					Create Shop
				</h1>
				<div className="flex items-center space-x-6">
					<h1 className="text-white text-xl uppercase pr-[152px]">Name</h1>
					<input
						type="text"
						className="px-8 py-1 text-center bg-white"
						{...register("name", { required: true })}
					/>
				</div>
				<div className="flex items-center space-x-6">
					<h1 className="text-white text-xl uppercase pr-[122px]">Address</h1>
					<input
						type="text"
						className="px-8 py-1 text-center bg-white"
						{...register("address", { required: true })}
					/>
				</div>
				<div className="flex items-center space-x-6">
					<h1 className="text-white text-xl uppercase pr-[25px]">
						Contact Number
					</h1>
					<input
						type="text"
						className="px-8 py-1 text-center bg-white"
						{...register("phoneNumber", { required: true })}
					/>
				</div>
				<h1 className="text-white text-2xl uppercase font-black mb-2">Price</h1>
				<div className="flex text-white justify-around ">
					<div className="flex flex-col text-center">
						<h1 className="uppercase text-lg">Tshirt</h1>
						<input
							type="text"
							className="text-center w-20 text-black bg-white"
							{...register("tshirt")}
						/>
					</div>
					<div className="flex flex-col text-center">
						<h1 className="uppercase text-lg">Shirt</h1>
						<input
							type="text"
							className="text-center w-20 text-black bg-white"
							{...register("shirt")}
						/>
					</div>
					<div className="flex flex-col text-center">
						<h1 className="uppercase text-lg">Shorts</h1>
						<input
							type="text"
							className="text-center w-20 text-black bg-white"
							{...register("shorts")}
						/>
					</div>
				</div>
				<div className="flex text-white justify-around pb-2">
					<div className="flex flex-col text-center ">
						<h1 className="uppercase text-lg">Pant</h1>
						<input
							type="text"
							className="text-center w-20 text-black bg-white"
							{...register("pant")}
						/>
					</div>
					<div className="flex flex-col text-center">
						<h1 className="uppercase text-lg">Towel</h1>
						<input
							type="text"
							className="text-center w-20 text-black bg-white"
							{...register("towel")}
						/>
					</div>
					<div className="flex flex-col text-center items-center">
						<h1 className="uppercase text-lg">Bedsheet</h1>
						<input
							type="text"
							className="text-center w-20 text-black bg-white"
							{...register("bedsheet")}
						/>
					</div>
				</div>

				<button
					className="bg-white mx-16 py-1 text-lg font-bold uppercase hover:scale-110 duration-400"
					type="submit"
				>
					Create Shop
				</button>
			</form>
		</div>
	);
}

export default OShopCreate;
