import React, { useEffect, useState } from "react";
import {
	LuMessageSquare,
	LuMoreHorizontal,
	LuPencil,
	LuPlus,
	LuStar,
	LuZap,
} from "react-icons/lu";
import UserOptions from "../UserOptions";
import configs from "../../../../configs";
import { useAuthContext } from "../../../../contexts/AuthProvider";
import useChat from "../../../../hooks/useChat";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

export default function ChatTab({ handleToggleDatabase, setSidebarTab, chats }) {
	const { chatId } = useParams();
	
	return (
		<>
			<div className="bg-zinc-800 border-b border-zinc-600 w-full text-[#ccc] px-6 text-center h-16 flex items-center justify-between">
				<div className="flex items-center justify-center gap-2 cursor-default">
					<LuMessageSquare size={20} /> Chats
				</div>

				{/* USER OPTIONS DROPDOWN */}
				<UserOptions
					handleToggleDatabase={handleToggleDatabase}
					setSidebarTab={setSidebarTab}
				/>
			</div>

			<div className="relative w-full flex flex-col flex-1 text-sm bg-[#2d2d2d] text-[#ccc] overflow-y-auto overflow-x-hidden p-4">
				{/* NOW CHATS */}
				<div className="text-white">
					<div className="py-2 font-normal text-xs cursor-default">
						Now
					</div>
					<ul>
						<li>
							<div className="chat-title relative rounded-lg hover:bg-[#353535] cursor-pointer text-[.975rem]">
								<Link to={'/chat'} className="flex items-center justify-between gap-2 py-2 px-4">
									<p>New chat</p>
									<div className="flex items-center opacity-0">
										<div className="p-2">
											<LuPlus />
										</div>
									</div>
								</Link>
							</div>
						</li>
					</ul>
				</div>

				<div className="py-2"></div>

				{/* PREVIOUS CHATS */}
				<div className="flex-1 text-white">
					<div className="py-2 font-normal text-xs cursor-default">
						Previous chats
					</div>
					<ul>
						{chats?.map((chat, idx) => {
							return (
								<li key={idx}>
									<div className={classNames({
										"chat-title relative rounded-lg hover:bg-[#353535] text-[.975rem]": true,
										"active": chat._id == chatId
									})}>
										<Link
											to={`/chat/${chat._id}`}
											className="flex items-center justify-between gap-2 py-2 px-4"
										>
											<p>
												{chat.title}
											</p>
											<div className="flex items-center opacity-0">
												<div className="p-2 hover:bg-[#2d2d2d] rounded-full">
													<LuPencil />
												</div>
												<div className="p-2 hover:bg-[#2d2d2d] rounded-full">
													<LuMoreHorizontal />
												</div>
											</div>
										</Link>
									</div>
								</li>
							);
						})}
						<li>
							<div className="chat-title relative rounded-lg hover:bg-[#353535] text-[.975rem]">
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
							<div className="chat-title relative rounded-lg hover:bg-[#353535] text-[.975rem]">
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

				{/* UPGRADE PLAN */}
				<div className="upgrade-plan cursor-pointer w-[100%] h-16 flex items-center justify-start rounded-xl hover:bg-[#353535]">
					<div className="flex">
						<div className="w-16 flex items-center justify-center">
							<LuZap size={25} />
						</div>
						<div className="flex flex-1 flex-col">
							<div className="font-bold text-white">
								Upgrade plan
							</div>
							<div className="text-[#999]">
								Get Gemma2, Mistral, and more
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
