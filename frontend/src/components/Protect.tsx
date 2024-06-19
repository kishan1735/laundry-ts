import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Protect({ type, children }) {
	const [cookies] = useCookies(["access_token", "refresh_token"]);
	const [protect, setProtect] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (!cookies.access_token || !cookies.refresh_token) {
			navigate(`/${type}/login`);
		} else {
			setProtect(true);
		}
	}, [cookies.access_token, cookies.refresh_token, type, navigate]);
	if (protect) return <>{children}</>;
}

export default Protect;
