import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function OShops() {
	const navigate = useNavigate();
	const [cookies] = useCookies(["access_token"]);
	const { status, data } = useQuery({
		queryKey: ["owner_shops"],
		queryFn: async () => {
			const res = await axios.get("http://127.0.0.1:8000/api/owner/shop", {
				headers: { Authorization: `Bearer ${cookies.access_token}` },
			});
			return res;
		},
	});
	return (
		<div
			id="home"
			className="min-h-screen h-full flex flex-col space-y-8 items-center"
		>
			<Navbar type="owner" />
			<button
				className="bg-white py-4 px-8 text-2xl font-bold uppercase hover:scale-110 duration-400 border-2 border-black opacity-80"
				onClick={() => {
					navigate("/owner/shop/create");
				}}
				type="button"
			>
				Create Shop
			</button>
			<div className="flex space-x-8">
				{status === "success" ? (
					data.data.shops.map((el, i) => {
						return (
							<div
								className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400 hover:scale-105 cursor-pointer"
								onClick={() => {
									navigate(`/owner/shop/${el.id}`);
								}}
								key={i}
							>
								<h1 className="text-white text-2xl uppercase mb-2 mx-auto">
									{el.name}
								</h1>
								<div className="flex text-white space-x-8 justify-between">
									<h1 className=" text-xl text-yellow-200 uppercase mb-2">
										Address 🏠
									</h1>
									<h1 className=" text-xl uppercase mb-2">{el.address}</h1>
								</div>
								<div className="flex text-white space-x-8 justify-between">
									<h1 className=" text-xl text-yellow-200 uppercase mb-2">
										Phone Number 📞
									</h1>
									<h1 className=" text-xl uppercase font-black mb-2">
										{el.phoneNumber}
									</h1>
								</div>
								<div className="flex text-white space-x-8 justify-between">
									<h1 className=" text-xl text-yellow-200 uppercase mb-2">
										Satisfied <span className="ml-1">😄</span>
									</h1>
									<h1 className=" text-xl uppercase mb-2">{el.satisfied}</h1>
								</div>
								<div className="flex text-white space-x-8 justify-between">
									<h1 className=" text-xl text-yellow-200 uppercase mb-2">
										Unsatisfied <span className="ml-1">😞</span>
									</h1>
									<h1 className=" text-xl uppercase mb-2">{el.unsatisfied}</h1>
								</div>
							</div>
						);
					})
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default OShops;
