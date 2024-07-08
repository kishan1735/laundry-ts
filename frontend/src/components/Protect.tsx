import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

function Protect({ type }) {
	const [protect, setProtect] = useState(true);
	const { data, status } = useQuery({
		queryKey: ["type"],
		queryFn: () => {
			return axios.get("http://127.0.0.1:8000/auth/type", {
				withCredentials: true,
			});
		},
	});
	useEffect(() => {
		if (
			status === "success" &&
			data.data.status === "success" &&
			data.data.type === type
		) {
			setProtect(true);
		} else if (
			status === "success" &&
			(data.data.status === "failed" || data.data.type !== type)
		) {
			setProtect(false);
			toast.error("Login and try again");
		}
	}, [data, setProtect, status, type]);
	return protect ? <Outlet /> : <Navigate to={`/${type}/login`} />;
}

export default Protect;
