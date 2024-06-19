import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ type }: { type: string }) {
	const [cookies, setCookie, removeCookie] = useCookies([
		"access_token",
		"refresh_token",
	]);
	const navigate = useNavigate();
	const handleClick = () => {
		removeCookie("access_token");
		removeCookie("refresh_token");
		navigate("/owner/login");
	};
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
				onClick={handleClick}
				type="button"
			>
				Logout
			</button>
		</nav>
	);
}

export default Navbar;
