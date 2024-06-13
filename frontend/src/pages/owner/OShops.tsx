import { useNavigate } from "react-router-dom";

function OShops() {
	const navigate = useNavigate();
	return (
		<div
			id="home"
			className="h-screen flex flex-col space-y-4 items-center justify-center"
		>
			<button
				className="bg-white py-4 px-8 text-xl font-bold uppercase hover:scale-110 duration-400 border-2 border-black"
				onClick={() => {
					navigate("/owner/shop/create");
				}}
			>
				Create Shop
			</button>
		</div>
	);
}

export default OShops;
