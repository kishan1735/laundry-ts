import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function ULogin() {
	return (
		<div className="h-screen flex flex-col items-center space-y-40" id="home">
			<nav className="bg-black opacity-80 flex w-full justify-between py-4 px-6 mb-4">
				<Link
					className="text-yellow-200 uppercase font-black text-3xl flex items-center cursor-pointer"
					to="/"
				>
					<p className="pr-1">LaundryTS</p> <p className="pb-1"> 🧺</p>
				</Link>
			</nav>
			<div className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400 mt-12">
				<h1 className="text-white text-3xl uppercase font-black mb-2 mx-auto">
					User Login
				</h1>
				<a
					className="bg-white mx-16 py-1 text-xl font-black uppercase hover:scale-110 duration-400 px-6 flex items-center space-x-4"
					href="http://127.0.0.1:8000/auth/google"
				>
					<FontAwesomeIcon icon={faGoogle} />
					<p className="mt-1">Login</p>
				</a>
			</div>
		</div>
	);
}

export default ULogin;
