import type { ErrorResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ type }: { type: string }) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: () => {
			return axios.get("http://127.0.0.1:8000/api/owner/logout", {
				withCredentials: true,
			});
		},
		onSuccess: () => {
			navigate("/owner/login");
			toast.success("Logged out successfully");
			queryClient.invalidateQueries({ queryKey: [`${type}`] });
		},
		onError: (err: AxiosError<ErrorResponse>) => {
			toast.error(err.response.data.message);
		},
	});
	return (
		<nav className="bg-black opacity-80 flex w-full justify-between py-4 px-6 mb-2">
			<Link
				className="text-yellow-200 uppercase font-black text-3xl flex items-center cursor-pointer"
				to={`/${type}/dashboard`}
			>
				<p className="pr-1">LaundryTS</p> <p className="pb-1 pl-1"> 👕</p>
			</Link>
			<button
				className="bg-white text-black text-lg font-black uppercase border-slaste-500 px-3 hover:scale-110"
				onClick={() => {
					mutate();
				}}
				type="button"
			>
				Logout
			</button>
		</nav>
	);
}

export default Navbar;
