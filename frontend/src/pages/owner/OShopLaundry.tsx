import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function OShopLaundry() {
	const { id } = useParams();
	const { data, status } = useQuery({
		queryKey: [`owner_shop_laundry ${id}`],
		queryFn: () => {
			return axios.get(
				`http://127.0.0.1:8000/api/owner/shop/${id}/laundry/get`,
				{ withCredentials: true },
			);
		},
	});
	return (
		<div
			id="home"
			className="min-h-screen h-full flex flex-col space-y-40 items-center pb-8"
		>
			<Navbar type="owner" />
			<div className="flex space-x-8">
				{status === "success" ? (
					data.data.laundry.map((el, i) => {
						return (
							<Link
								className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400 hover:scale-105"
								to={`/owner/shop/${id}/laundry/${el.id}`}
								key={`${i * 2}`}
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

export default OShopLaundry;
