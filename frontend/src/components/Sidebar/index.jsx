import classNames from "classnames";
import React, { useState } from "react";
import {
	LuDatabase,
	LuDatabaseBackup,
	LuMessageSquare,
	LuMoreHorizontal,
	LuPencil,
} from "react-icons/lu";
import Markdown from "../Markdown";
import { useAuthContext } from "../../contexts/AuthProvider";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import configDev from "../../configs";

export default function Sidebar({
	formData,
	handleChangeForm,
	showDatabase,
	handleToggleDatabase,
}) {
	// const [isMarkdownView, setIsMarkdownView] = useState(true);
	const [tab, setTab] = useState("chat");
	const { user, setUser } = useAuthContext();
	const { fetch, loading, error } = useFetch();
	const navigate = useNavigate();

	const onLogout = async () => {
		const options = {
			url: configDev["backendURL"] + "/auth/logOut",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-client-id": user._id,
			},
			withCredentials: true,
		};

		const result = await fetch(options);
		clearUser();
		navigate("/login");
	};

	const clearUser = () => {
		setUser(null);
		localStorage.clear();
	};

	// const handleTextareaChange = (e) => {
	// 	handleChangeForm("schema", e.target.value);
	// 	setTextareaContent(e.target.value);
	// };

	const formatAsPreCode = (content) => {
		return `\`\`\`sql\n${content}\n\`\`\``;
	};

	return (
		<>
			<div className="bg-zinc-800 border-b border-zinc-600 w-full text-[#ccc] px-6 text-center h-16 flex items-center justify-between">
				{tab === "chat" && (
					<div className="flex items-center justify-center gap-2 cursor-default">
						<LuMessageSquare size={20} /> Chats
					</div>
				)}

				{tab === "schema" && (
					<div className="flex items-center justify-center gap-2 cursor-default">
						<LuDatabase size={18} /> Schema
					</div>
				)}

				<div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="rounded-full hover:bg-zinc-600 cursor-pointer flex items-center gap-3 text-sm"
					>
						<img
							className="rounded-full"
							width={40}
							src={user.avatar}
						/>
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content menu bg-zinc-800 rounded-box z-[1] w-52 p-2 shadow"
					>
						<li onClick={() => setTab("chat")}>
							<a>Chats</a>
						</li>
						<li onClick={() => setTab("schema")}>
							<a>Schema</a>
						</li>
						<li onClick={handleToggleDatabase}>
							<a>Minimize</a>
						</li>
						<li onClick={onLogout}>
							<a className="text-red-400">Logout</a>
						</li>
					</ul>
				</div>
			</div>

			{tab === "chat" && (
				<>
					<div className="w-full flex-1 text-sm bg-[#2d2d2d] text-[#ccc] overflow-y-auto overflow-x-hidden p-4">
						{/* NOW CHATS */}
						<div className="py-2 font-normal text-xs cursor-default">
							Now
						</div>
						<ul>
							<li>
								<div className="chat-title relative rounded-lg active:opacity-90 hover:bg-[#353535] cursor-pointer">
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
						</ul>
					</div>
				</>
			)}

			{tab === "schema" && (
				<>
					{formData["schema"] ? (
						<div className="w-full flex-1 text-sm bg-[#2d2d2d] text-[#ccc] overflow-y-auto overflow-x-hidden">
							<Markdown
								content={formatAsPreCode(formData["schema"])}
							/>
						</div>
					) : (
						<div className="flex flex-1 items-center justify-center w-full text-[#ccc]">
							<div className="cursor-default text-center flex flex-col justify-center items-center">
								<LuDatabaseBackup size={100} /> Schema is empty
							</div>
						</div>
					)}
				</>
			)}

			{/* {tab === "schema" && (
				<>
					{isMarkdownView ? (
						<div className="w-full flex-1 text-sm bg-[#2d2d2d] text-[#ccc] overflow-y-auto overflow-x-hidden">
							<Markdown
								content={formatAsPreCode(formData["schema"])}
							/>
						</div>
					) : (
						<textarea
							style={{ lineHeight: 1.8 }}
							className="w-full flex-1 text-sm bg-[#2d2d2d] text-[#ccc] p-[14px] mt-[7px] focus:outline-0 focus:ring-0"
							name="schema"
							onChange={handleTextareaChange}
							value={formData["schema"]}
							placeholder="Enter SQL Schema here ..."
						/>
					)}
				</>
			)} */}
		</>
	);
}
