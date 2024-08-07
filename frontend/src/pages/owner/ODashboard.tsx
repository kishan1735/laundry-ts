import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

function OLanding() {
	return (
		<div className="h-screen flex flex-col space-y-32 items-center" id="home">
			<Navbar type="owner" />
			<div className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-8 border-2 border-slate-400">
				<Link
					className="bg-white mx-16 py-6 px-8 text-2xl font-bold uppercase hover:scale-110 duration-400"
					to="/owner/profile"
				>
					Owner Profile
				</Link>
				<Link
					className="bg-white mx-16 py-6 px-8 text-2xl font-bold uppercase hover:scale-110 duration-400"
					to="/owner/shop"
				>
					Shop Profile
				</Link>
			</div>
		</div>
	);
}

export default OLanding;
