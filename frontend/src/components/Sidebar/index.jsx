import classNames from "classnames";
import React, { useState } from "react";
import { LuDatabase, LuMoreHorizontal } from "react-icons/lu";
import Markdown from "../Markdown";

export default function Sidebar({
	formData,
	handleChangeForm,
	showDatabase,
	setShowDatabase
}) {
	const [isMarkdownView, setIsMarkdownView] = useState(false);

	const handleToggleView = () => {
		setIsMarkdownView(!isMarkdownView);
	};

	const handleTextareaChange = (e) => {
		handleChangeForm('schema', e.target.value);
		setTextareaContent(e.target.value)
	};

	const formatAsPreCode = (content) => {
		return `\`\`\`sql\n${content}\n\`\`\``;
	};

	return (
		<>
			<div className="bg-zinc-800 border-b border-zinc-600 w-full text-[#ccc] px-4 text-center h-12 flex items-center justify-between">
				<div className="flex items-center justify-center gap-2 cursor-default">
					<LuDatabase size={20} /> MySQL
				</div>

				<div className="dropdown dropdown-bottom dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="p-2 rounded-full hover:bg-zinc-600 cursor-pointer "
					>
						<LuMoreHorizontal size={20} />
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
					>
						<li>
							<a onClick={handleToggleView}>
								{!isMarkdownView ? "Preview" : "Editor"}
							</a>
						</li>
						<li>
							<a onClick={() => setShowDatabase((prev) => !prev)}>
								Close
							</a>
						</li>
					</ul>
				</div>
			</div>
			{isMarkdownView ? (
				<div className="w-full flex-1 text-sm bg-[#2d2d2d] text-[#ccc] overflow-y-auto overflow-x-hidden">
					<Markdown content={formatAsPreCode(formData['schema'])}/ >
				</div>
			) : (
				<textarea
					style={{ lineHeight: 1.8 }}
					className="w-full flex-1 text-sm bg-[#2d2d2d] text-[#ccc] p-[14px] mt-[7px] focus:outline-0 focus:ring-0"
					name="schema"
					onChange={handleTextareaChange}
					value={formData['schema']}
					placeholder="Enter SQL Schema here ..."
				/>
			)}
		</>
	);
}
