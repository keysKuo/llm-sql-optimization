import React, { useEffect, useState } from "react";
import Message from "../components/MessageBox/Message";
import MessageBox from "../components/MessageBox";
import Markdown from "../components/Markdown";

export default function HomePage() {   
	const [formData, setFormData] = useState({
		question: '',
		schema: '',
		memory: ''
	})

	const handleChangeValue = (e) => {
		const { name, value } = e.target;
		setFormData({...formData, [name]: value})
	}

	return (
		<div className="flex justify-center items-center w-full gap-0">
			<div className="flex-1 h-[100svh] flex flex-col items-center shadow-messagebox">
				<MessageBox formData={formData} setFormData={setFormData} />
			</div>
			<div className="w-[30rem] h-[100svh] flex flex-col items-center shadow-messagebox">
				<label
					className="bg-zinc-700 w-full text-white text-center h-16 flex items-center justify-center"
					htmlFor=""
				>
					Database Schema
				</label>
				<textarea
					name="schema"
					onChange={handleChangeValue}
					placeholder="Ex: CREATE TABLE USER (
	username VARCHAR(255) NOT NULL,
	age int NOT NULL,
	...
)"

					className="w-full flex-1 text-sm bg-zinc-800 text-[#ccc] p-5 leading-7 focus:outline-0 focus:ring-0"
				/>
			</div>
		</div>
	);
}
