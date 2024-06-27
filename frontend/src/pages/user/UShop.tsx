import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function UShop() {
	const { id } = useParams();
	const { data, status } = useQuery({
		queryKey: [`user_shop ${id}`],
		queryFn: () => {
			const res = axios.get(`http://127.0.0.1:8000/api/user/shop/${id}/get`, {
				withCredentials: true,
			});

			return res;
		},
	});
	return (
		<div
			id="home"
			className="min-h-screen h-full flex flex-col space-y-6 items-center"
		>
			<Navbar type="owner" />
			<div className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400">
				{status === "success" ? (
					<>
						<h1 className="text-white text-2xl uppercase mb-2 mx-auto">
							{data.data.shop.name}
						</h1>
						<div className="flex text-white space-x-8 justify-between">
							<h1 className=" text-xl text-yellow-200 uppercase mb-2">
								Address <span className="ml-1">🏠</span>
							</h1>
							<h1 className=" text-xl uppercase mb-2">
								{data.data.shop.address}
							</h1>
						</div>

						<div className="flex text-white space-x-8 justify-between">
							<h1 className=" text-xl text-yellow-200 uppercase mb-2">
								Phone Number <span className="ml-1">📞</span>
							</h1>
							<h1 className=" text-xl uppercase font-black">
								{data.data.shop.phoneNumber}
							</h1>
						</div>

						<h1 className="text-white text-2xl mx-auto pb-2">Price</h1>
						<div className="grid grid-cols-2 text-white space-y-3 border-2 my-2 border-slate-400 py-4">
							{Object.entries(data.data.shop.price).map(
								(el: [string, number], i) => {
									if (i >= 1)
										return (
											<div
												className={`flex text-white mx-auto space-x-8 ${
													i === 1 ? "mt-3" : ""
												}`}
												key={i}
											>
												<h1 className=" text-xl text-yellow-200 uppercase font-black mb-2 text-end">
													{el[0]}
												</h1>
												<h1 className=" text-xl uppercase font-black mb-2">
													{el[1]}
												</h1>
											</div>
										);
								},
							)}
						</div>
						<div className="flex text-white space-x-8 justify-between pt-2">
							<h1 className=" text-xl text-yellow-200 uppercase mb-2">
								Satisfied <span className="ml-1">😄</span>
							</h1>
							<h1 className=" text-xl uppercase mb-2">
								{data.data.shop.satisfied}
							</h1>
						</div>
						<div className="flex text-white space-x-8 justify-between">
							<h1 className=" text-xl text-yellow-200 uppercase mb-2">
								Unsatisfied <span className="ml-1">😞</span>
							</h1>
							<h1 className=" text-xl uppercase mb-2">
								{data.data.shop.unsatisfied}
							</h1>
						</div>
						<Link
							className="bg-white mx-16 py-1 text-lg font-bold uppercase hover:scale-110 duration-400 px-8 text-center"
							to={`/user/shop/${id}/laundry`}
						>
							Laundry
						</Link>
					</>
				) : (
					<h1 className="text-white text-2xl uppercase mb-2 mx-auto">
						Loading
					</h1>
				)}
			</div>
		</div>
	);
}

export default UShop;
