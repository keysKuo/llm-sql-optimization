import React, { useState, useCallback, useEffect } from "react";
import classNames from "classnames";
import configs from "../../../configs";
import useFetch from "../../../hooks/useFetch";
import Header from "./Header";
import Input from "./Input";
import ChatBox from "./ChatBox";
import { useParams } from "react-router-dom";
import useChat from "../../../hooks/useChat";

const MessageBox = ({
	formData,
	handleChangeForm,
	showDatabase,
	handleToggleDatabase,
	sidebarTab,
	setSidebarTab,
	recommends,
	setRecommends,
}) => {
	const [messages, setMessages] = useState([]);
	const { chatId } = useParams();

	const { fetch, error, loading } = useFetch();
	const {
		addNewMessage,
		loadHistoryMessages,
		loading: chatLoading,
		error: chatError,
	} = useChat();

	// LOAD HISTORY MESSAGES
	useEffect(() => {
		const LoadMessages = async () => {
			if (!chatId) {
				setMessages([]);
				return;
			}

			const result = await loadHistoryMessages(chatId);
			// console.log(result);
			if (!chatError) {
				setMessages(result?.metadata?.messages || []);
			}
		};

		LoadMessages();
	}, [chatId]);

	const addMessage = (_id, type, mess, data = {}) => {
		addNewMessage(_id, type, mess, data);
		setMessages((prev) => [
			...prev,
			{
				chatId: _id,
				type: type,
				body: mess,
				data: data,
				createdAt: new Date().toISOString(),
			},
		]);
	};

	const onSendMessage = useCallback(
		async (input, callback) => {
			if (!input) {
				return;
			}

			if (!formData["schema"]) {
				setSidebarTab("schema");
				return;
			}

			const askBot = async (_id) => {
				addMessage(_id, "question", input);
				if (callback) callback();
				const options = {
					url: `${configs["CREWAI_URL"]}/test`,
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					data: JSON.stringify({ ...formData, question: input }),
				};

				const { output, execute, columns } = await fetch(options);
				addMessage(_id, "response", output, { columns, execute });
			};

			askBot(chatId);
		},
		[formData, addMessage]
	);

	return (
		<>
			{/* HEADER */}
			<Header
				formData={formData}
				handleChangeForm={handleChangeForm}
				showDatabase={showDatabase}
				handleToggleDatabase={handleToggleDatabase}
			/>

			{/* CONVERSATION'S MESSAGES */}
			<ChatBox
				loading={loading}
				messages={messages}
				formData={formData}
				onSendMessage={onSendMessage}
				recommends={recommends}
			/>

			{/* MESSAGE INPUT */}
			<Input
				loading={loading}
				formData={formData}
				handleChangeForm={handleChangeForm}
				onSendMessage={onSendMessage}
				sidebarTab={sidebarTab}
				setSidebarTab={setSidebarTab}
				setRecommends={setRecommends}
			/>
		</>
	);
};

export default React.memo(MessageBox);
