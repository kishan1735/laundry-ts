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

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<BrowserRouter>
				<Routes>
					<Route element={<Home />} path="/" />
					//Owner
					<Route element={<Owner />} path="/owner" />
					<Route element={<OLogin />} path="/owner/login" />
					<Route element={<OSignup />} path="/owner/signup" />
					<Route element={<ODashboard />} path="/owner/dashboard" />
					<Route element={<OProfile />} path="/owner/profile" />
					<Route element={<OUpdate />} path="/owner/profile/update" />
					<Route element={<OShops />} path="/owner/shop" />
					<Route element={<OShopCreate />} path="/owner/shop/create" />
					<Route element={<OForgotPassword />} path="/owner/forgotpassword" />
					<Route element={<OResetPassword />} path="/owner/resetpassword" />
				</Routes>
			</BrowserRouter>
			<Toaster position="top-center" />
		</QueryClientProvider>
	);
}

export default App;
