import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function OProfile() {
	const [cookies, setCookie, removeCookie] = useCookies([
		"access_token",
		"refresh_token",
	]);
	const navigate = useNavigate();
	const { status, data } = useQuery({
		queryKey: ["owner"],
		queryFn: async () => {
			const res = await axios.get("http://127.0.0.1:8000/api/owner/get", {
				headers: {
					Authorization: `Bearer ${cookies.access_token}`,
					"Content-Type": "application/json",
				},
			});
			return res;
		},
	});

	return (
		<div
			className="min-h-screen h-full flex flex-col items-center space-y-28"
			id="home"
		>
			<Navbar type="owner" />
			<div className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400">
				{status === "pending" ? (
					<h1 className="text-white text-3xl uppercase mb-2 mx-auto">
						Loading
					</h1>
				) : (
					<>
						<h1 className="text-white text-3xl uppercase mb-2 mx-auto">
							Owner Profile
						</h1>
						<div className="flex justify-start items-center space-x-48">
							<h1 className="text-xl text-yellow-200 uppercase font-black">
								Name
							</h1>
							<h1 className="text-xl text-white font-black">
								{data.data?.owner?.name || ""}
							</h1>
						</div>

						<div className="flex justify-start items-center space-x-20">
							<h1 className="text-xl text-yellow-200 uppercase font-black">
								Phone Number
							</h1>
							<h1 className="text-xl text-white font-black">
								{data.data?.owner?.phoneNumber || ""}
							</h1>
						</div>
						<div className="flex justify-start items-center space-x-44 pb-4">
							<h1 className="text-xl text-yellow-200 uppercase font-black">
								Email
							</h1>
							<h1 className="text-xl text-white font-black">
								{data.data?.owner?.email || ""}
							</h1>
						</div>
						<Link
							to="/owner/profile/update"
							className="bg-white mx-auto py-2 px-6 text-lg font-bold uppercase hover:scale-110 duration-400"
						>
							Update Profile
						</Link>
					</>
				)}
			</div>
		</div>
	);
}

export default OProfile;
