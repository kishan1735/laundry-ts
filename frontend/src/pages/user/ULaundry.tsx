import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

function ULaundry() {
	const { laundryId } = useParams();
	const { data, status } = useQuery({
		queryKey: [`user_laundry ${laundryId}`],
		queryFn: () => {
			return axios.get(`http://127.0.0.1:8000/api/user/laundry/${laundryId}`, {
				withCredentials: true,
			});
		},
	});
	console.log(data);
	return (
		<div
			id="home"
			className="min-h-screen h-full min-w-screen w-full flex flex-col space-y-8 items-center"
		>
			<Navbar type="user" />
			<div className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400">
				{status === "success" ? (
					<>
						<h1 className="text-yellow-200 text-3xl mb-2 text-center">
							Order No: {data.data.laundry.id}
						</h1>
						<h1 className="text-white text-2xl mb-2">
							{new Date(data.data.laundry.createdAt).toString().split("GMT")[0]}
						</h1>
						<div className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400 hover:scale-105">
							{data.data.laundry.tshirt > 0 ? (
								<div className="flex text-white space-x-8 justify-between">
									<h1 className=" text-xl text-yellow-200 uppercase mb-2">
										Tshirt
									</h1>
									<h1 className=" text-xl uppercase mb-2">
										{data.data.laundry.tshirt}
									</h1>
								</div>
							) : (
								""
							)}
							{data.data.laundry.shirt > 0 ? (
								<div className="flex text-white space-x-8 justify-between">
									<h1 className=" text-xl text-yellow-200 uppercase mb-2">
										Shirt
									</h1>
									<h1 className=" text-xl uppercase mb-2">
										{data.data.laundry.shirt}
									</h1>
								</div>
							) : (
								""
							)}
							{data.data.laundry.pant > 0 ? (
								<div className="flex text-white space-x-8 justify-between">
									<h1 className=" text-xl text-yellow-200 uppercase mb-2">
										Pant
									</h1>
									<h1 className=" text-xl uppercase mb-2">
										{data.data.laundry.pant}
									</h1>
								</div>
							) : (
								""
							)}
							{data.data.laundry.shorts > 0 ? (
								<div className="flex text-white space-x-8 justify-between">
									<h1 className=" text-xl text-yellow-200 uppercase mb-2">
										Shorts
									</h1>
									<h1 className=" text-xl uppercase mb-2">
										{data.data.laundry.shorts}
									</h1>
								</div>
							) : (
								""
							)}
							{data.data.laundry.towel > 0 ? (
								<div className="flex text-white space-x-8 justify-between">
									<h1 className=" text-xl text-yellow-200 uppercase mb-2">
										Towel
									</h1>
									<h1 className=" text-xl uppercase mb-2">
										{data.data.laundry.towel}
									</h1>
								</div>
							) : (
								""
							)}
							{data.data.laundry.bedsheet > 0 ? (
								<div className="flex text-white space-x-8 justify-between">
									<h1 className=" text-xl text-yellow-200 uppercase mb-2">
										Bedsheet
									</h1>
									<h1 className=" text-xl uppercase mb-2">
										{data.data.laundry.bedsheet}
									</h1>
								</div>
							) : (
								""
							)}
						</div>
						<div className="flex text-white space-x-8 justify-center">
							<h1 className=" text-2xl text-yellow-200 uppercase mb-2">
								Status
							</h1>
							<h1 className=" text-2xl mb-2">{data.data.laundry.status}</h1>
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default ULaundry;
