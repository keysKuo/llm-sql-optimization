import React, { useEffect, useRef, useState, useCallback } from "react";
import {
	LuChevronDown,
	LuDatabase,
	LuMic,
	LuSend,
} from "react-icons/lu";
import Message from "./Message";
import classNames from "classnames";
import axios from "axios";
import Response from "./Response";
import configs from '../../configs';

const MessageBox = ({ formData, setFormData, showDatabase, setShowDatabase }) => {
	const [input, setInput] = useState("");
	const [visiblePicker, setVisiblePicker] = useState(false);
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);
	const chatBoxRef = useRef(null);

	const handleChangeInput = useCallback((e) => {
		setInput(e.target.value);
		setFormData((prevFormData) => ({ ...prevFormData, question: e.target.value }));
	}, [setFormData]);

	const onSendMessage = useCallback(async () => {
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
		try {
			const response = await axios.request(options);
			const result = response.data;
			const { output, execute, columns } = result;
			addMessage("response", output, { columns, execute });
			if (!execute) {
				setFormData((prevFormData) => ({ ...prevFormData, memory: output }));
			} else {
				setFormData((prevFormData) => ({ ...prevFormData, memory: "None" }));
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	}, [input, formData, setFormData]);

	const onPressEnter = (e) => {
		if (e.key === "Enter") {
			onSendMessage();
		}
	};

	const clearInput = () => {
		setInput("");
		setVisiblePicker(false);
	};

	const addMessage = (type, mess, data = {}) => {
		setMessages((prev) => [
			...prev,
			{
				type: type,
				body: mess,
				data: data,
				createdAt: new Date().toISOString(),
			},
		]);
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

	return (
		<>
			{/* HEADER */}
			<div className="chatbox-header w-full flex items-center justify-between px-4 py-2 mb-5 text-[#ccc]">
				<div className="flex items-center justify-center gap-2">
					<div className="flex flex-col items-start justify-center text-[#ccc]">
						<div className="dropdown">
							<div
								tabIndex={0}
								onClick={() => setVisiblePicker(true)}
								role="button"
								className="px-6 py-2 rounded-lg flex items-center justify-between hover:bg-gray-300 m-1 text-[#000]"
							>
								Llama3 {formData['model']} <LuChevronDown />
							</div>
							{visiblePicker && (
								<ul
									onClick={() => setVisiblePicker(false)}
									tabIndex={0}
									className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 shadow"
								>
									<li>
										<a name="Local" onClick={() => setFormData({ ...formData, model: '8b' })}>
											Llama3 8b
										</a>
									</li>
									<li name="Groq" onClick={() => setFormData({ ...formData, model: '70b' })}>
										<a>Llama3 70b</a>
									</li>
								</ul>
							)}
						</div>
					</div>
				</div>

				<div className="flex items-center justify-center gap-3">
					<div
						onClick={() => setShowDatabase((prev) => !prev)}
						className={classNames({
							"p-2 rounded-full hover:bg-gray-300 cursor-pointer text-black ": true,
							hidden: showDatabase,
						})}
					>
						<LuDatabase size={20} />
					</div>
				</div>
			</div>

			{/* CONVERSATION'S MESSAGES */}
			<div ref={chatBoxRef} className="chatbox-content scroll-smooth overflow-y-scroll overflow-x-hidden w-full flex flex-1 flex-col items-start justify-between 2xl:px-5 px-7 py-2">
				<div className="w-full flex flex-col items-start justify-between space-y-5">
					{messages.length === 0 ? (
						<div className="w-full h-[80svh] flex flex-col items-center justify-center">
							<img className="w-72" src="https://ezticket.io.vn/logo_2.png" alt=""></img>
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
		</>
	);
}

export default React.memo(MessageBox);
