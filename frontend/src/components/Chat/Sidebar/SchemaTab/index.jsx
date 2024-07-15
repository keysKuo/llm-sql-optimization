import React, { useCallback, useEffect, useState } from "react";
import { LuDatabase, LuDatabaseBackup, LuUpload } from "react-icons/lu";
import Markdown from "../../../Markdown";
import UserOptions from "../UserOptions/";
import useUpload from "../../../../hooks/useUpload";

export default function SchemaTab({
	formData,
	setSidebarTab,
	handleToggleDatabase,
	handleChangeForm
}) {
	const { upload, loading: fileLoading, error: uploadError } = useUpload();

	// useEffect(() => {

	// }, [handleChangeForm])

	const onChangeFile = async (e) => {
		const file = e.target.files[0];
		const result = await upload(file);
		if (!uploadError) {
			handleChangeForm("schema", result["sql_content"]);
		}
	};

	const formatAsPreCode = (content) => {
		return `\`\`\`sql\n${content}\n\`\`\``;
	};

	return (
		<>
			<div className="bg-zinc-800 border-b border-zinc-600 w-full text-[#ccc] px-6 text-center h-16 flex items-center justify-between">
				<div className="flex items-center justify-center gap-2 cursor-default">
					<LuDatabase size={18} /> Schema
				</div>

				{/* USER OPTIONS DROPDOWN */}
				<UserOptions
					handleToggleDatabase={handleToggleDatabase}
					setSidebarTab={setSidebarTab}
				/>
			</div>
			<>
				{formData["schema"] ? (
					<div className="w-full flex-1 text-sm bg-[#2d2d2d] text-[#ccc] overflow-y-auto overflow-x-hidden">
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
