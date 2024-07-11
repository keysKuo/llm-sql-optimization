import React from "react";
import ChatTab from "./ChatTab";
import SchemaTab from "./SchemaTab";

export default function Sidebar({
	formData,
	handleChangeForm,
	showDatabase,
	sidebarTab,
	setSidebarTab,
	handleToggleDatabase,
}) {
	return (
		<>
			{sidebarTab === "chat" ? (
				<ChatTab
					handleToggleDatabase={handleToggleDatabase}
					setSidebarTab={setSidebarTab}
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
