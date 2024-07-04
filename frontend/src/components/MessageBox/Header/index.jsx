import classNames from "classnames";
import { useState } from "react";
import { LuChevronDown, LuDatabase } from "react-icons/lu";

const MODELS = [
	{ name: "Gemma2 9b", model: "gemma2:9b" },
	{ name: "Mistral 7b", model: "mistral:7b" },
	{ name: "Llama3 8b", model: "llama3:8b" },
	{ name: "Llama3 70b", model: "llama3:70b" },
	{ name: "Phi3 Mini", model: "phi3:3.8b" },
	{ name: "Phi3 Medium", model: "phi3:14b" },
	{ name: "Gemma2 Groq", model: "groq" },
];

export default function Header({
	formData,
	handleChangeForm,
	showDatabase,
	handleToggleDatabase,
}) {
	const [visiblePicker, setVisiblePicker] = useState(false);

	return (
		<div className="chatbox-header w-full flex items-center justify-between px-4 py-2 mb-5 text-[#ccc]">
			<div className="flex items-center justify-center gap-2">
				<div className="flex flex-col items-start justify-center text-[#ccc]">
					<div className="dropdown">
						<div
							tabIndex={0}
							onClick={() => setVisiblePicker(true)}
							role="button"
							className="px-6 py-2 rounded-lg flex items-center justify-between hover:bg-gray-300 m-1 text-[#000]"
						>
							{formData["model"]} <LuChevronDown />
						</div>
						{visiblePicker && (
							<ul
								onClick={() => setVisiblePicker(false)}
								tabIndex={0}
								className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 shadow"
							>
								{MODELS.map((m, idx) => {
									return (
										<li key={idx}>
											<a onClick={() => handleChangeForm("model", m.model)}>
												{m.name}
											</a>
										</li>
									);
								})}
								
							</ul>
						)}
					</div>
				</div>
			</div>

			<div className="flex items-center justify-center gap-3">
				<div
					onClick={handleToggleDatabase}
					className={classNames({
						"p-2 rounded-full hover:bg-gray-300 cursor-pointer text-black ": true,
						hidden: showDatabase,
					})}
				>
					<LuDatabase size={20} />
				</div>
			</div>
		</div>
	);
}
