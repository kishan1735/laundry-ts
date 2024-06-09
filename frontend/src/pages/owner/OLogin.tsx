import { Link, useNavigate } from "react-router-dom";

function OLogin() {
	const navigate = useNavigate();
	return (
		<div className="h-screen flex flex-col items-center" id="home">
			<>
				<nav className="bg-black opacity-80 flex w-full justify-between py-4 px-6 mb-4">
					<h1
						className="text-yellow-200 uppercase font-black text-3xl flex items-center cursor-pointer"
						onClick={() => navigate("/")}
					>
						<p className="pr-1">LaundryTS</p> <p className="pb-1"> 🧺</p>
					</h1>
				</nav>
				<div className="bg-black opacity-80 flex flex-col px-12 py-8 space-y-4 border-2 border-slate-400 mt-12">
					<h1 className="text-white text-3xl uppercase font-black mb-2">
						Owner Login
					</h1>
					<div className="flex items-center space-x-6">
						<h1 className="text-white text-xl uppercase pr-12">Email</h1>
						<input
							type="text"
							// value={email}
							className="px-6 py-1"
							// onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex items-center space-x-6 pb-2">
						<h1 className="text-white text-xl uppercase">Password</h1>
						<input
							type="password"
							// value={password}
							className="px-6 py-1"
							// onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						className="bg-white mx-16 py-1 text-lg font-bold uppercase hover:scale-110 duration-400"
						//   onClick={handleClick}
					>
						Login
					</button>
					<h1 className="text-white text-center">
						New User -{" "}
						<Link
							to="/owner/signup"
							className="underline uppercase text-yellow-200"
						>
							SignUp
						</Link>{" "}
						to Get Started
					</h1>
					<button
						className="bg-white mx-16 py-1 text-lg font-bold uppercase hover:scale-110 duration-400 px-8"
						//   onClick={() => navigate("/owner/forgotpassword")}
					>
						Forgot Password
					</button>
					{/* <div className="uppercase text-sm text-center text-white w-[300px]">
              {error}
            </div> */}
				</div>
			</>
		</div>
	);
}

export default OLogin;
