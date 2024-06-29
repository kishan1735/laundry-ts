import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function Protect({ type }) {
	const [protect, setProtect] = useState(false);
	const { data, status } = useQuery({
		queryKey: ["type"],
		queryFn: () => {
			return axios.get("http://127.0.0.1:8000/auth/type", {
				withCredentials: true,
			});
		},
	});
	console.log(data);
	useEffect(() => {
		if (
			status === "success" &&
			data.data.status === "success" &&
			data.data.type === type
		) {
			console.log(data);
			setProtect(true);
		}
	}, [data, setProtect, status, type]);
	if (protect)
		return (
			<>
				<Outlet />
			</>
		);
}

export default Protect;
