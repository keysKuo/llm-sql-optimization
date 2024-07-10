import React, { useState, useCallback } from "react";
import classNames from "classnames";
import configs from "../../configs";
import useFetch from "../../hooks/useFetch";
import Header from "./Header";
import Input from "./Input";
import ChatBox from "./ChatBox";

const MessageBox = ({
	formData,
	handleChangeForm,
	showDatabase,
	handleToggleDatabase,
}) => {
	const [messages, setMessages] = useState([]);
	const { fetch, error, loading } = useFetch();
	
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

	const onSendMessage = useCallback(async (input, callback) => {
		if (!input) {
			return;
		}

		addMessage("question", input);
		callback();
		const options = {
			url: `${configs["CREWAI_URL"]}/test`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({...formData, question: input}),
		};

		const { output, execute, columns } = await fetch(options);
		addMessage("response", output, { columns, execute });
	}, [formData, addMessage]);

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
			/>
		</>
	);
};

export default React.memo(MessageBox);
