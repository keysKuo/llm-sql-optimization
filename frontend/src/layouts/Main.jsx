import React from "react";
import { Outlet } from "react-router-dom";
import SocialWidgets from "../components/SocialWidgets";


export default function MainLayout() {
	return (
		<>
			<main className="main h-[100svh] text-zinc-700 flex items-center justify-center">
				<Outlet />
			</main>
		</>
	);
}
