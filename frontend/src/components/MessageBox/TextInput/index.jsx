import React from "react";
import { LuMic, LuSend } from "react-icons/lu";

export default function TextInput({
	loading,
	formData,
	handleChangeForm,
	onSendMessage,
}) {

    const onPressEnter = (e) => {
		if (e.key === "Enter") {
			onSendMessage();
		}
	};

	return (
		<div className="chatbox-input w-full flex items-center justify-between px-5 py-2 gap-3">
			{/* TEXT INPUT */}
			<div className="relative flex items-center justify-start w-[50%] mx-auto text-gray-500 my-3">
				<input
					disabled={loading}
					type="text"
					placeholder="Type your request ..."
					className="px-14 py-3 rounded-badge focus:outline-0 w-full bg-[#F5F6F6] text-base shadow-messagebox"
					value={formData["question"]}
					onChange={(e) =>
						handleChangeForm("question", e.target.value)
					}
					onKeyDown={onPressEnter}
				/>

				<LuMic size={24} className="absolute ml-4 cursor-pointer" />

				{/* SEND BuTTON */}
				<button
					disabled={loading}
					className="absolute right-2 flex items-center justify-center p-3 cursor-pointer"
					onClick={onSendMessage}
				>
					{loading ? (
						<span className="loading loading-bars loading-sm"></span>
					) : (
						<LuSend size={22} />
					)}
				</button>
			</div>
		</div>
	);
}
