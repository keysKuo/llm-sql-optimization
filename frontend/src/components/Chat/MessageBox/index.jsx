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
}) => {
	const [messages, setMessages] = useState([]);
	const { chatId } = useParams();

	const { fetch, error, loading } = useFetch();
	const {
		createNewChat,
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
			console.log(result);
			if (!chatError) {
				setMessages(result?.metadata?.messages || []);
			}
		}

		LoadMessages();
	}, [chatId])

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
	};

	const onSendMessage = useCallback(
		async (input, callback) => {
			if (!input) {
				return;
			}

			const askBot = async () => {
				addMessage("question", input);
				callback();
				const options = {
					url: `${configs["CREWAI_URL"]}/test`,
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					data: JSON.stringify({ ...formData, question: input }),
				};

				const { output, execute, columns } = await fetch(options);
				addMessage("response", output, { columns, execute });
			};

			if (chatId) {
				Promise.all([
					askBot(),
					addNewMessage(chatId, "question", input, {})
				]);
			}
			else {
				Promise.all([
					askBot(),
					createNewChat()
				]);
			}
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
			<ChatBox loading={loading} messages={messages} />

			{/* MESSAGE INPUT */}
			<Input
				loading={loading}
				formData={formData}
				handleChangeForm={handleChangeForm}
				onSendMessage={onSendMessage}
				sidebarTab={sidebarTab}
				setSidebarTab={setSidebarTab}
			/>
		</>
	);
};

export default React.memo(MessageBox);
