import { Link } from "react-router-dom";

function Home() {
	return (
		<div
			id="home"
			className="h-screen flex flex-col space-y-4 items-center justify-center"
		>
			<h1 className="text-6xl uppercase text-white py-4 px-8 bg-black">
				LaundryTS
			</h1>
			<Link
				to="/user"
				className="bg-white opacity-75 text-6xl font-bold uppercase px-8 py-10 border-2 border-black hover:scale-110 duration-200"
			>
				User
			</Link>
			<Link
				to="/owner"
				className="bg-white opacity-75 text-6xl font-bold uppercase px-8 py-10 border-2 border-black hover:scale-110 duration-200"
			>
				Owner
			</Link>
		</div>
	);
}

export default Home;
