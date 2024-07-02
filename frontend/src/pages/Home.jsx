import React, { useEffect, useState } from "react";
import MessageBox from "../components/MessageBox";
import Sidebar from "../components/Sidebar";
import classNames from "classnames";

export default function HomePage() {
	const [formData, setFormData] = useState({
		question: "",
		schema: "",
		memory: "",
		model: "Groq",
	});

	const [showDatabase, setShowDatabase] = useState(false);

	const handleChangeValue = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

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
					setFormData={setFormData}
					showDatabase={showDatabase}
					setShowDatabase={setShowDatabase}
				/>
			</div>

			<Sidebar
				formData={formData}
				handleChangeValue={handleChangeValue}
				showDatabase={showDatabase}
				setShowDatabase={setShowDatabase}
			/>
		</div>
	);
}
