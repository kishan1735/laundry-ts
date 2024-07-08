import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import OLogin from "./pages/owner/OLogin";
import Owner from "./pages/owner/Owner";
import OSignup from "./pages/owner/OSignup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ODashboard from "./pages/owner/ODashboard";
import OProfile from "./pages/owner/OProfile";
import OUpdate from "./pages/owner/OUpdate";
import OShops from "./pages/owner/OShops";
import OShopCreate from "./pages/owner/OShopCreate";
import OForgotPassword from "./pages/owner/OForgotPassword";
import OResetPassword from "./pages/owner/OResetPassword";
import OShop from "./pages/owner/OShop";
import OShopUpdate from "./pages/owner/OShopUpdate";
import Protect from "./components/Protect";
import User from "./pages/user/User";
import ULogin from "./pages/user/ULogin";
import UDashboard from "./pages/user/UDashboard";
import UProfile from "./pages/user/UProfile";
import UUpdate from "./pages/user/UUpdate";
import UShops from "./pages/user/UShops";
import UShop from "./pages/user/UShop";
import UShopLaundry from "./pages/user/UShopLaundry";
import ULaundryCreate from "./pages/user/ULaundryCreate";
import ULaundry from "./pages/user/ULaundry";
import ULaundrys from "./pages/user/ULaundrys";
import OShopLaundry from "./pages/owner/OShopLaundry";
import OLaundry from "./pages/owner/OLaundry";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<BrowserRouter>
				<Routes>
					<Route element={<Home />} path="/" />
					<Route element={<Owner />} path="/owner" />
					<Route element={<OLogin />} path="/owner/login" />
					<Route element={<OSignup />} path="/owner/signup" />
					<Route element={<OForgotPassword />} path="/owner/forgotpassword" />
					<Route element={<OResetPassword />} path="/owner/resetpassword" />
					<Route element={<User />} path="/user" />
					<Route element={<ULogin />} path="/user/login" />
					<Route element={<UDashboard />} path="/user/dashboard" />
					<Route element={<ODashboard />} path="/owner/dashboard" />
					<Route element={<Protect type="owner" />}>
						<Route element={<OProfile />} path="/owner/profile" />
						<Route element={<OUpdate />} path="/owner/profile/update" />
						<Route element={<OShops />} path="/owner/shop" />
						<Route element={<OShopCreate />} path="/owner/shop/create" />
						<Route element={<OShop />} path="/owner/shop/:id" />
						<Route element={<OShopUpdate />} path="/owner/shop/:id/update" />
						<Route element={<OShopLaundry />} path="/owner/shop/:id/laundry" />
						<Route
							element={<OLaundry />}
							path="/owner/shop/:id/laundry/:laundryId"
						/>
					</Route>
					<Route element={<Protect type="user" />}>
						<Route element={<UProfile />} path="/user/profile" />
						<Route element={<UUpdate />} path="/user/profile/update" />
						<Route element={<UShops />} path="/user/shop" />
						<Route element={<UShop />} path="/user/shop/:id" />
						<Route element={<UShopLaundry />} path="/user/shop/:id/laundry" />
						<Route
							element={<ULaundryCreate />}
							path="/user/shop/:id/laundry/create"
						/>
						<Route element={<ULaundry />} path="/user/laundry/:laundryId" />
						<Route element={<ULaundrys />} path="/user/laundry" />
					</Route>
				</Routes>
			</BrowserRouter>
			<Toaster position="top-center" />
		</QueryClientProvider>
	);
}

export default App;
