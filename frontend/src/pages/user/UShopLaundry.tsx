import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function UShopLaundry() {
	const { id } = useParams();
	const { data, status } = useQuery({
		queryKey: [`user_shop_laundry ${id}`],
		queryFn: () => {
			return axios.get(
				`http://127.0.0.1:8000/api/user/shop/${id}/laundry/get`,
				{ withCredentials: true },
			);
		},
	});
	return (
		<div
			id="home"
			className="min-h-screen h-full min-w-screen w-full flex flex-col space-y-12 items-center"
		>
			<Navbar type="user" />
			<Link
				className="bg-white py-4 px-8 text-2xl font-bold uppercase hover:scale-110 duration-400 border-2 border-black opacity-80"
				to={`/user/laundry/${id}`}
			>
				Create Laundry
			</Link>
			<div className="flex space-x-8">
				{status === "success" ? (
					data.data.laundry.map((el) => {
						return (
							<Link
								className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400 hover:scale-105"
								to={`/user/laundry/${el.id}`}
							>
								<h1 className="text-yellow-200 text-3xl mb-2 text-center">
									Order No: {el.id}
								</h1>
								<h1 className="text-white text-2xl mb-2">
									{new Date(el.createdAt).toString().split("GMT")[0]}
								</h1>
								<div className="flex text-white space-x-4 justify-center">
									<h1 className=" text-2xl text-yellow-200 uppercase mb-2">
										Status
									</h1>
									<h1 className=" text-2xl mb-2">{el.status}</h1>
								</div>
							</Link>
						);
					})
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default UShopLaundry;
