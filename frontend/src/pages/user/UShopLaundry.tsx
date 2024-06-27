import Navbar from "@/components/Navbar";
import { Link, useParams } from "react-router-dom";

function UShopLaundry() {
	const { id } = useParams();
	return (
		<div
			id="home"
			className="min-h-screen h-full flex flex-col space-y-8 items-center"
		>
			<Navbar type="user" />
			<Link
				className="bg-white py-4 px-8 text-2xl font-bold uppercase hover:scale-110 duration-400 border-2 border-black opacity-80"
				to={`/user/shop/${id}/laundry/create`}
			>
				Create Laundry
			</Link>
		</div>
	);
}

export default UShopLaundry;
