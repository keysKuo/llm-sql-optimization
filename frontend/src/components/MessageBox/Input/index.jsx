import React, { useCallback, useState } from "react";
import { LuSave, LuSend } from "react-icons/lu";
import useFetch from "../../../hooks/useFetch";
import configs from "../../../configs";
import Modal from "../../Modal";

export default function Input({
	loading,
	formData,
	handleChangeForm,
	onSendMessage,
}) {
	const { fetch, loading: fileLoading, error } = useFetch();
	const [input, setInput] = useState("");
	const [showModal, setShowModal] = useState(true);

	const onChangeFile = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("file", file);

		const options = {
			url: configs["CREWAI_URL"] + "/upload",
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		};

		const result = await fetch(options);
		if (!error) {
			handleChangeForm("schema", result["sql_content"]);
		}
	};

	const onPressEnter = (e) => {
		if (e.key === "Enter") {
			showModal
				? document.getElementById("confirm").showModal()
				: onSendMessage(input, clearInput);
		}
	};

	const clearInput = useCallback(() => {
		setInput("");
	}, [input]);

	return (
		<div className="chatbox-input w-full flex items-center justify-between px-5 py-2 gap-3">
			<Modal
				onSendMessage={onSendMessage}
				input={input}
				clearInput={clearInput}
				setShowModal={setShowModal}
			/>

			{/* TEXT INPUT */}
			<div className="relative flex items-center justify-start w-[50%] mx-auto text-gray-500 my-3">
				<input
					disabled={loading || fileLoading}
					type="text"
					placeholder={
						fileLoading
							? "Loading Schema ..."
							: "Type your request ..."
					}
					className="px-16 py-3 rounded-badge focus:outline-0 w-full bg-[#F5F6F6] text-base shadow-messagebox"
					value={input}
					onChange={(e) =>
						// handleChangeForm("question", e.target.value)
						setInput(e.target.value)
					}
					onKeyDown={onPressEnter}
				/>

				<div className="absolute ml-4 p-2 hover:text-zinc-800">
					<div className="relative w-full flex items-center">
						<LuSave size={22} className="absolute" />
						<input
							disabled={loading || fileLoading}
							type="file"
							className="w-8 opacity-0 ml-[-6px]"
							name="file"
							onChange={onChangeFile}
						/>
					</div>
				</div>

				{/* SEND BuTTON */}
				<button
					disabled={loading || fileLoading}
					className="absolute right-2 flex items-center justify-center p-3 cursor-pointer hover:text-zinc-800"
					// onClick={onSendMessage}
					onClick={() =>
						showModal
							? document.getElementById("confirm").showModal()
							: onSendMessage(input, clearInput)
					}
				>
					{loading || fileLoading ? (
						<span className="loading loading-bars loading-sm"></span>
					) : (
						<LuSend size={22} />
					)}
				</button>

				{/* TOGGLE EXPLAIN */}
				<div className="absolute right-[-9rem]">
					<label className="label cursor-pointer flex gap-2">
						<input
							type="checkbox"
							name="is_explain"
							className="toggle toggle-sm checked:text-emerald-300"
							onChange={(e) => {
								handleChangeForm("is_explain", e.target.checked)
							}}
						/>
						<span className="label-text">Explaination</span>
					</label>
				</div>
			</div>
		</div>
	);
}
