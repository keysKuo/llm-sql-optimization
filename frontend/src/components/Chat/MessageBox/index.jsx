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
				setRecommends(result?.metadata?.chat?.recommends);
				setMessages(result?.metadata?.messages || []);
			}
		};

		LoadMessages();
	}, [chatId]);

	const addMessage = (_id, type, mess, data = {}) => {
		const body = typeof(mess) === 'string' ? mess : JSON.stringify(mess)
		addNewMessage(_id, type, body, data);
		setMessages((prev) => [
			...prev,
			{
				chatId: _id,
				type: type,
				body: body,
				data: data,
				createdAt: new Date().toISOString(),
			},
		]);
	};

	const onSendMessage = useCallback(
		async (chatId, input, callback) => {
			if (!input) {
				return;
			}
			// console.log(input)
			if (!formData["schema"]) {
				setSidebarTab("schema");
				return;
			}

			const askBot = async (_id) => {
				addMessage(_id, "question", input);
				if (callback) callback();
				const formToRequest = new FormData();
				formToRequest.append("question", input);
				formToRequest.append("schema", formData["schema"]);
				formToRequest.append("model", formData["model"]);
				formToRequest.append("is_explain", formData["is_explain"]);

				const options = {
					url: `${configs["CREWAI_URL"]}/ask-chat`,
					method: "POST",
					headers: {
						"Content-Type": "multipart/form-data",
					},
					data: formToRequest,
				};

				const {
					query, 		// SQL Query
					explain, 	// Explanation
					index, 		// Indexing code
					partition, 	// Partition code
					suggest, 	// Suggestions
					problems, 	// Problems
					rows, 		// Data records
					columns, 	// Data columns
				} = await fetch(options);
				addMessage(
					_id,
					"response",
					{ query, explain, index, partition, suggest, problems },
					{ rows, columns }
				);
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
				handleChangeForm={handleChangeForm}
				onSendMessage={onSendMessage}
				setSidebarTab={setSidebarTab}
				setRecommends={setRecommends}
			/>
		</>
	);
};

export default React.memo(MessageBox);
