import React from "react";
import { LuDatabase, LuHelpCircle, LuMessageSquare, LuUpload } from "react-icons/lu";
import Markdown from "../../../Markdown";
import UserOptions from "../UserOptions/";
import useUpload from "../../../../hooks/useUpload";
import { useNavigate, useParams } from "react-router-dom";
import useChat from "../../../../hooks/useChat";

export default function SchemaTab({
	formData,
	setSidebarTab,
	handleToggleDatabase,
	handleChangeForm
}) {
	const { upload, loading: fileLoading, error: uploadError } = useUpload();
	const { createNewChat, updateSchema } = useChat();
	const navigate = useNavigate();
	const { chatId } = useParams();

	const onChangeFile = async (e) => {
		const file = e.target.files[0];
		const result = await upload(file);
		if (!uploadError) {
			handleChangeForm("schema", result["sql_content"]);

			if (!chatId) {
				const newChat = await createNewChat();
				await updateSchema(newChat?.metadata?._id, result["sql_content"], result['title']);
				navigate(`/chat/${newChat?.metadata?._id}`);
			}
			else {
				await updateSchema(chatId, result["sql_content"], result['title'])
			}
		}
	};

	const formatAsPreCode = (content) => {
		return `\`\`\`sql\n${content}\n\`\`\``;
	};

	return (
		<>
			<div className="bg-zinc-800 border-b border-zinc-600 w-full text-[#ccc] px-6 text-center h-16 flex items-center justify-between">
				<div className="flex items-center justify-center gap-2 cursor-default">
					<div onClick={() => setSidebarTab("chat")} className="p-3 rounded-box hover:bg-[#353535] cursor-pointer">
						<LuMessageSquare size={20} /> 
					</div>
					<div onClick={() => setSidebarTab("schema")} className="active flex items-center gap-2 px-4 py-2 rounded-box">
						<LuDatabase size={20} /> 
					</div>
					<div className="p-3 rounded-box hover:bg-[#353535] cursor-pointer">
						<LuHelpCircle size={20} /> 
					</div>
				</div>

				{/* USER OPTIONS DROPDOWN */}
				<UserOptions
					handleToggleDatabase={handleToggleDatabase}
				/>
			</div>
			<>
				{formData["schema"] ? (
					<div className="w-full flex-1 text-sm bg-[#2d2d2d] text-[#ccc] overflow-y-auto overflow-x-hidden px-1">
						<Markdown
							content={formatAsPreCode(formData["schema"])}
						/>
					</div>
				) : (
					<div className="flex flex-1 items-center justify-center w-full text-[#ccc]">
						<div className="text-center flex flex-col justify-center items-center gap-2 cursor-pointer">
							<LuUpload size={100} /> Click here to upload Schema
							<input
								disabled={fileLoading}
								type="file"
								className="absolute w-40 h-40 cursor-pointer opacity-0 ml-[-6px]"
								name="file"
								onChange={onChangeFile}
							/>
						</div>
					</div>
				)}
			</>
		</>
	);
}
