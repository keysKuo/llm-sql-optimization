import React from "react";
import { Outlet } from "react-router-dom";


export default function SecondLayout() {
	return (
		<>
			<main className="main w-[100vw] min-h-[100svh] bg-[#2d2d2d] flex items-center justify-center">
				<Outlet />
			</main>
		</>
	);
}
