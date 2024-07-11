import React from "react";
import { LuMessageSquare, LuMoreHorizontal, LuPencil } from "react-icons/lu";
import UserOptions from "../UserOptions";

export default function ChatTab({
	handleToggleDatabase,
	onLogout,
	setSidebarTab,
}) {
	return (
		<>
			<div className="bg-zinc-800 border-b border-zinc-600 w-full text-[#ccc] px-6 text-center h-16 flex items-center justify-between">
				<div className="flex items-center justify-center gap-2 cursor-default">
					<LuMessageSquare size={20} /> Chats
				</div>

				{/* USER OPTIONS DROPDOWN */}
				<UserOptions
					handleToggleDatabase={handleToggleDatabase}
					onLogout={onLogout}
					setSidebarTab={setSidebarTab}
				/>
			</div>

			<div className="w-full flex-1 text-sm bg-[#2d2d2d] text-[#ccc] overflow-y-auto overflow-x-hidden p-4">
				{/* NOW CHATS */}
				<div className="py-2 font-normal text-xs cursor-default">
					Now
				</div>
				<ul>
					<li>
						<div className="active chat-title relative rounded-lg active:opacity-90 hover:bg-[#353535] cursor-pointer">
							<a className="flex items-center justify-between gap-2 py-2 px-4">
								<p>New chat</p>
								<div className="flex items-center opacity-0">
									<div className="p-2 hover:bg-[#2d2d2d] rounded-full">
										<LuPencil />
									</div>
									<div className="p-2 hover:bg-[#2d2d2d] rounded-full">
										<LuMoreHorizontal />
									</div>
								</div>
							</a>
						</div>
					</li>
				</ul>

				<div className="py-2"></div>

				{/* PREVIOUS CHATS */}
				<div className="py-2 font-normal text-xs cursor-default">
					Previous chats
				</div>
				<ul>
					<li>
						<div className="chat-title relative rounded-lg active:opacity-90 hover:bg-[#353535]">
							<a
								href=""
								className="flex items-center justify-between gap-2 py-2 px-4"
							>
								<p>Python Flask Destructuring JSON</p>
								<div className="flex items-center opacity-0">
									<div className="p-2 hover:bg-[#2d2d2d] rounded-full">
										<LuPencil />
									</div>
									<div className="p-2 hover:bg-[#2d2d2d] rounded-full">
										<LuMoreHorizontal />
									</div>
								</div>
							</a>
						</div>
					</li>
					<li>
						<div className="chat-title relative rounded-lg active:opacity-90 hover:bg-[#353535]">
							<a
								href=""
								className="flex items-center justify-between gap-2 py-2 px-4"
							>
								<p>Asynchronous function in Python</p>
								<div className="flex items-center opacity-0">
									<div className="p-2 hover:bg-[#2d2d2d] rounded-full">
										<LuPencil />
									</div>
									<div className="p-2 hover:bg-[#2d2d2d] rounded-full">
										<LuMoreHorizontal />
									</div>
								</div>
							</a>
						</div>
					</li>
				</ul>
			</div>
		</>
	);
}
