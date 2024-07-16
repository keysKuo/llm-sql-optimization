import React, { useCallback, useEffect, useState } from "react";
import MessageBox from "../components/Chat/MessageBox";
import Sidebar from "../components/Chat/Sidebar";
import classNames from "classnames";

export default function ChatPage() {
	const [formData, setFormData] = useState({
		question: "",
		schema: "",
		memory: "None",
		is_explain: false,
		model: "gemma2:9b-instruct-q4_1",
	});
	const [sidebarTab, setSidebarTab] = useState('chat');
	
	const handleChangeForm = useCallback(
		(name, value) => {
			setFormData({ ...formData, [name]: value });
		},
		[formData]
	);

	const [showDatabase, setShowDatabase] = useState(true);
	const handleToggleDatabase = useCallback(() => {
		setShowDatabase((prev) => !prev);
	}, []);

	return (
		<div className="flex justify-start items-center w-full gap-0">
			<div
				className={classNames({
					"h-[100svh] flex flex-col items-center shadow-messagebox bg-[#2d2d2d] transition-all": true,
					"w-[20%]": sidebarTab === 'chat',
					"w-[30%]": sidebarTab === 'schema',
					hidden: !showDatabase,
				})}
			>
				<Sidebar
					formData={formData}
					handleChangeForm={handleChangeForm}
					showDatabase={showDatabase}
					sidebarTab={sidebarTab}
					setSidebarTab={setSidebarTab}
					handleToggleDatabase={handleToggleDatabase}
				/>
			</div>
			<div
				className={classNames({
					"h-[100svh] flex flex-1 flex-col items-center shadow-messagebox": true,
					"w-[70%]": showDatabase,
					"w-[100%]": !showDatabase,
				})}
			>
				<MessageBox
					formData={formData}
					handleChangeForm={handleChangeForm}
					showDatabase={showDatabase}
					handleToggleDatabase={handleToggleDatabase}
					sidebarTab={sidebarTab}
					setSidebarTab={setSidebarTab}
				/>
			</div>
		</div>
	);
}
