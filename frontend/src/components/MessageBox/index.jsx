import React, { useEffect, useRef, useState } from "react";
import {
	LuChevronDown,
	LuCode2,
	LuDatabase,
	LuMic,
	LuSend,
	LuUpload,
} from "react-icons/lu";
import Message from "./Message";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import classNames from "classnames";
import axios from "axios";
import Response from "./Response";
import configs from '../../configs';

export default function MessageBox({ formData, setFormData, showDatabase, setShowDatabase }) {
	const [input, setInput] = useState("");
	const [visiblePicker, setVisiblePicker] = useState(false);
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);
	const chatBoxRef = useRef(null);

	const handleChangeInput = (e) => {
		setInput(e.target.value);
		setFormData({ ...formData, question: e.target.value });
	};

	const onSendMessage = async () => {
		if (input === "") {
			return;
		}

		setLoading(true);
		addMessage("question", input);
		const options = {
			url: `${configs['BACKEND_URL']}/test`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(formData),
		};

		clearInput();
		await axios
			.request(options)
			.then((response) => response.data)
			.then((result) => {
				const { output, execute, columns } = result;
				addMessage("response", output, {columns, execute});
				if(!execute) {
					setFormData({...formData, memory: output})
				}
				else {
					setFormData({...formData, memory: ""})
				}
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
			})
	};

	const onPressEnter = (e) => {
		if (e.key === "Enter") {
			onSendMessage();
		}
	};

	const clearInput = () => {
		setInput("");
		setVisiblePicker(false);
	};

	const addMessage = (type, mess, data={}) => {
		setMessages((prev) => {
			return [
				...prev,
				{
					type: type,
					body: mess,
					data: data,
					createdAt: new Date().toISOString(),
				},
			];
		});
		scrollToBottom();
	};

	const scrollToBottom = () => {
		if (chatBoxRef.current) {
			chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const onChangeModel = (e) => {
		setFormData({...formData, model: e.target.name})
	}

	return (
		<>
			{/* HEADER */}
			<div
				className="chatbox-header w-full flex items-center justify-between px-4 py-2 mb-5 text-[#ccc]"
			>
				<div className="flex items-center justify-center gap-2">
					<div className="flex flex-col items-start justify-center text-[#ccc]">
						<div className="dropdown">
							<div
								tabIndex={0}
								role="button"
								className="px-6 py-2 rounded-lg flex items-center justify-between hover:bg-gray-300 m-1 text-[#000]"
							>
								Llama3 {formData['model']} <LuChevronDown />
							</div>
							<ul
								tabIndex={0}
								className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 shadow"
							>
								<li>
									<a name="Local" onClick={onChangeModel}>
										Llama3 Local
									</a>
								</li>
								<li name="Groq" onClick={onChangeModel}>
									<a>Llama3 Groq</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-center gap-3">		
					<div onClick={() => setShowDatabase((prev) => !prev)} className={classNames({
						"p-2 rounded-full hover:bg-gray-300 cursor-pointer text-black ": true,
						"hidden": showDatabase
					})}>
						<LuDatabase size={20} />
					</div>
				</div>
			</div>

			{/* CONVERSATION'S MESSAGES */}
			<div ref={chatBoxRef} className="chatbox-content scroll-smooth overflow-y-scroll overflow-x-hidden w-full flex flex-1 flex-col items-start justify-between 2xl:px-5 px-7 py-2">
				<div className="w-full flex flex-col items-start justify-between space-y-5">
					{messages.length === 0 ? (
						<div className="w-full h-[80svh] flex flex-col items-center justify-center">
							<img
								className="w-72"
								src="https://ezticket.io.vn/logo_2.png"
								alt=""
							></img>
						</div>
					) : (
						<>
							{messages?.map((mess, idx) => {
								return mess.type === "question" ? (
									<Message key={idx} message={mess} />
								) : (
									<Response key={idx} message={mess} />
								);
							})}

							{loading && <Response message={"Đang xử lý"} isSkeleton={true} />}
						</>
					)}
				</div>
			</div>

			{/* MESSAGE INPUT */}
			<div className="chatbox-input w-full flex items-center justify-between px-5 py-2 gap-3">
				{/* TEXT INPUT */}
				<div className="relative flex items-center justify-start w-[50%] mx-auto text-gray-500 my-3">
					<input
						disabled={loading}
						type="text"
						placeholder="Type your request ..."
						className="px-14 py-3 rounded-badge focus:outline-0 w-full bg-[#F5F6F6] text-base shadow-messagebox"
						value={input}
						onChange={handleChangeInput}
						onKeyDown={onPressEnter}
					/>

					<div
						className={classNames({
							hidden: !visiblePicker,
							"fixed z-[100] bottom-[24dvh]": visiblePicker,
						})}
					>
						<Picker
							data={data}
							previewPosition="none"
							onEmojiSelect={(e) => {
								setInput((prev) => prev + e.native);
								setVisiblePicker((prev) => !prev);
							}}
							theme={"light"}
						/>
					</div>

					<LuMic
						onClick={() => {
							setVisiblePicker((prev) => !prev);
						}}
						size={24}
						className="absolute ml-4 cursor-pointer"
					/>

					{/* SEND BuTTON */}
					<button
						disabled={loading}
						className="absolute right-2 flex items-center justify-center p-3 cursor-pointer"
					>
						{loading ? (
							<span className="loading loading-bars loading-sm"></span>
						) : (
							<LuSend size={22} />
						)}
					</button>
				</div>
			</div>
		</>
	);
}
