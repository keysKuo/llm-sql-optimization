import React, { useEffect, useState } from "react";
import {
	LuDatabase,
	LuHelpCircle,
	LuMessageSquare,
	LuPencil,
	LuPlus,
	LuTrash,
	LuZap,
} from "react-icons/lu";
import UserOptions from "../UserOptions";
import useChat from "../../../../hooks/useChat";
import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";

export default function ChatTab({
	handleToggleDatabase,
	setSidebarTab,
	chats,
	setChats,
	handleChangeForm,
}) {
	const { chatId } = useParams();
	const navigate = useNavigate();
	const { deleteChat, error: chatError } = useChat();

	const onDeleteChat = async (_id) => {
		const result = await deleteChat(_id);
		navigate("/chat");
		setChats(chats.filter((chat) => chat._id !== _id));
		console.log(result);
	};

	return (
		<>
			<div className="bg-zinc-800 border-b border-zinc-600 w-full text-[#ccc] px-6 text-center h-16 flex items-center justify-between">
				<div className="flex items-center justify-center gap-2 cursor-default">
					<div
						onClick={() => setSidebarTab("chat")}
						className="active flex items-center gap-2 px-4 py-2 rounded-box"
					>
						<LuMessageSquare size={20} />
					</div>
					<div
						onClick={() => setSidebarTab("schema")}
						className="p-3 rounded-box hover:bg-[#353535] cursor-pointer "
					>
						<LuDatabase size={20} />
					</div>
					<div className="p-3 rounded-box hover:bg-[#353535] cursor-pointer">
						<LuHelpCircle size={20} />
					</div>
				</div>

				<UserOptions handleToggleDatabase={handleToggleDatabase} />
			</div>

			<div className="relative w-full flex flex-col flex-1 text-sm bg-[#2d2d2d] text-[#ccc] overflow-y-auto overflow-x-hidden p-4">
				{/* NOW CHATS */}
				<div className="text-white">
					<div className="py-2 font-normal text-xs cursor-default">
						Now
					</div>
					<ul>
						<li>
							<div
								onClick={() => {
									handleChangeForm("schema", "");
									setSidebarTab("schema");
								}}
								className={classNames({
									"chat-title relative rounded-lg hover:bg-[#353535] cursor-pointer text-[.975rem]": true,
									active: !chatId,
								})}
							>
								<Link
									to={"/chat"}
									className="flex items-center justify-between gap-2 py-2 px-4"
								>
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
					<ul className="space-y-1">
						{chats?.map((chat, idx) => {
							return (
								<li key={idx}>
									<div
										className={classNames({
											"chat-title flex item-center justify-between relative rounded-lg hover:bg-[#353535] text-[.975rem] px-3 py-1": true,
											active: chat._id == chatId,
										})}
									>
										<Link
											to={`/chat/${chat._id}`}
											className="flex items-center justify-between gap-2 py-1 w-[80%]"
										>
											<p className="">{chat.title}</p>
										</Link>
										<div className="flex items-center opacity-0">
											<div className="p-2 hover:bg-[#2d2d2d] rounded-full">
												<LuPencil />
											</div>
											<div
												onClick={() =>
													onDeleteChat(chat?._id)
												}
												className="p-2 hover:bg-[#2d2d2d] rounded-full"
											>
												<LuTrash color="#FA7070" />
											</div>
										</div>
									</div>
								</li>
							);
						})}
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
