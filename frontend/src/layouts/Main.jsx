import React from "react";
import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuthContext } from "../contexts/AuthProvider";

export default function MainLayout() {
	const { showLoading, setShowLoading } = useAuthContext();
	return (
		<>
			{showLoading && <Loading />}
			<main className="main w-[100vw] h-[100svh] bg-[#F2EFF2] text-zinc-700 flex items-center justify-center">
				<Outlet />
			</main>
		</>
	);
}
