import classNames from "classnames";
import React, { useState } from "react";
import {
	LuDatabase,
	LuMessageSquare,
	LuMoreHorizontal,
	LuPencil,
} from "react-icons/lu";
import Markdown from "../Markdown";
import { useAuthContext } from "../../contexts/AuthProvider";

export default function Sidebar({
	formData,
	handleChangeForm,
	showDatabase,
	handleToggleDatabase,
}) {
	// const [isMarkdownView, setIsMarkdownView] = useState(true);
	const [tab, setTab] = useState("chat");
	const { user } = useAuthContext();

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
						<li onClick={() => setTab('chat')}>
							<a>Chats</a>
						</li>
						<li onClick={() => setTab('schema')}>
							<a>Schema</a>
						</li>
						<li>
							<a onClick={handleToggleDatabase}>Close</a>
						</li>
					</ul>
				</div>
			</div>

			{tab === "chat" && (
				<>
					<div className="w-full flex-1 text-sm bg-[#2d2d2d] text-[#ccc] overflow-y-auto overflow-x-hidden p-4">
						{/* NOW CHATS */}
						<div className="py-2 font-normal text-xs cursor-default">Now</div>
						<ul>
							<li>
								<div className="chat-title relative rounded-lg active:opacity-90 hover:bg-[#353535]">
									<a
											className="flex items-center justify-between gap-2 py-2 px-4"
									>
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
						<div className="py-2 font-normal text-xs cursor-default">Previous chats</div>
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
					<div className="w-full flex-1 text-sm bg-[#2d2d2d] text-[#ccc] overflow-y-auto overflow-x-hidden">
						<Markdown
							content={formatAsPreCode(formData["schema"])}
						/>
					</div>
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
