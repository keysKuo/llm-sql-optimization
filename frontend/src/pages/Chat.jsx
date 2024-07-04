import React, { useCallback, useEffect, useState } from "react";
import MessageBox from "../components/MessageBox";
import Sidebar from "../components/Sidebar";
import classNames from "classnames";

export default function ChatPage() {
	const [formData, setFormData] = useState({
		question: "",
		schema: "",
		memory: "None",
		model: "8b",
	});

    const handleChangeForm = useCallback((name, value) => {
		setFormData({ ...formData, [name]: value });
	}, [formData]);

	const [showDatabase, setShowDatabase] = useState(false);
    const handleToggleDatabase = useCallback(() => {
        setShowDatabase(prev => !prev)
    }, [])
	

	return (
		<div className="flex justify-start items-center w-full gap-0">
			<div
				className={classNames({
					"h-[100svh] flex flex-col items-center shadow-messagebox": true,
					"w-[70%]": showDatabase,
					"w-[100%]": !showDatabase,
				})}
			>
				<MessageBox
					formData={formData}
                    handleChangeForm={handleChangeForm}
					showDatabase={showDatabase}
                    handleToggleDatabase={handleToggleDatabase}
				/>
			</div>
			<div
				className={classNames({
					"fixed right-0 w-[30%] h-[100svh] flex flex-col items-center shadow-messagebox bg-[#2d2d2d] p-2": true,
					hidden: !showDatabase,
				})}
			>
				<Sidebar
					formData={formData}
					handleChangeForm={handleChangeForm}
					showDatabase={showDatabase}
					handleToggleDatabase={handleToggleDatabase}
				/>
			</div>
		</div>
	);
}