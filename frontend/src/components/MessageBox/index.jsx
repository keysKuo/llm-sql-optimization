import React, { useState, useCallback } from "react";
import classNames from "classnames";
import configs from "../../configs";
import useFetch from "../../hooks/useFetch";
import Header from "./Header";
import TextInput from "./TextInput";
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
		clearInput();
	};

	const onSendMessage = useCallback(async () => {
		if (formData["question"] === "") {
			return;
		}

		addMessage("question", formData["question"]);
		const options = {
			url: `${configs["BACKEND_URL"]}/test`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(formData),
		};

		const { output, execute, columns } = await fetch(options);
		addMessage("response", output, { columns, execute });
	}, [formData, addMessage]);

	const clearInput = () => {
		handleChangeForm("question", "");
	};

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
			/>

			{/* MESSAGE INPUT */}
			<TextInput
				loading={loading}
				formData={formData}
				handleChangeForm={handleChangeForm}
				onSendMessage={onSendMessage}
			/>
		</>
	);
};

export default React.memo(MessageBox);
