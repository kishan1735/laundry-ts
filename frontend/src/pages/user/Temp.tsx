import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Temp() {
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		async function handleRedirect() {
			const res = await axios.get(`http://127.0.0.1:8000/auth/${id}`, {
				withCredentials: true,
			});
			if (res?.data?.status === "success") {
				navigate("/user/dashboard");
			} else {
				navigate("/user/login");
			}
		}
		handleRedirect();
	}, [id, navigate]);
	return (
		<div
			id="home"
			className="min-h-screen h-full min-w-screen w-full flex flex-col space-y-8 justify-center items-center"
		>
			<div className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400 text-2xl text-white">
				Loading
			</div>
		</div>
	);
}

export default Temp;
