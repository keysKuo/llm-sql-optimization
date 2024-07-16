import React, { useEffect, useState } from "react";
import ChatTab from "./ChatTab";
import SchemaTab from "./SchemaTab";
import useChat from "../../../hooks/useChat";
import { useParams } from "react-router-dom";

export default function Sidebar({
	formData,
	handleChangeForm,
	showDatabase,
	sidebarTab,
	setSidebarTab,
	handleToggleDatabase,
}) {
	const [chats, setChats] = useState([]);
	const {
		loadHistoryChats,
		loading: chatLoading,
		error: chatError,
	} = useChat();
	const { chatId } = useParams();

	// LOAD HISTORY CHATS
	useEffect(() => {
		const LoadHistory = async () => {
			const result = await loadHistoryChats();
			if (!chatError) {
				// console.log(result);
				setChats(result.metadata);
				const chat = result.metadata.find(
					(chat) => chat._id === chatId
				);
				handleChangeForm("schema", chat?.schema || "");
			}
		};

		LoadHistory();
	}, [chatId]);

	return (
		<>	
			{sidebarTab === "chat" ? (
				<ChatTab
					handleToggleDatabase={handleToggleDatabase}
					handleChangeForm={handleChangeForm}
					setSidebarTab={setSidebarTab}
					chats={chats}
					setChats={setChats}
				/>
			) : (
				<SchemaTab
					formData={formData}
					handleChangeForm={handleChangeForm}
					setSidebarTab={setSidebarTab}
					handleToggleDatabase={handleToggleDatabase}
				/>
			)}
			
		</>
	);
}
