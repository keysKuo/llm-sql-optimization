import React, { useEffect, useState } from "react";
import ChatTab from "./ChatTab";
import SchemaTab from "./SchemaTab";
import { useAuthContext } from "../../../contexts/AuthProvider";
import useChat from "../../../hooks/useChat";

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
	const { user } = useAuthContext();

	// LOAD HISTORY CHATS
	useEffect(() => {
		const LoadHistory = async () => {
			const result = await loadHistoryChats();
			if (!chatError) {
				console.log(result);
				setChats(result.metadata);
			}
		};

		LoadHistory();
	}, []);


	return (
		<>
			{sidebarTab === "chat" ? (
				<ChatTab
					handleToggleDatabase={handleToggleDatabase}
					setSidebarTab={setSidebarTab}
					chats={chats}
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
