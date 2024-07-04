import classNames from "classnames";
import { useState } from "react";
import { LuChevronDown, LuDatabase } from "react-icons/lu";

export default function Header({ formData, handleChangeForm, showDatabase, handleToggleDatabase }) {
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
							Llama3 {formData["model"]} <LuChevronDown />
						</div>
						{visiblePicker && (
							<ul
								onClick={() => setVisiblePicker(false)}
								tabIndex={0}
								className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 shadow"
							>
								<li>
									<a
										onClick={() =>
											handleChangeForm("model", "8b")
										}
									>
										Llama3 8b
									</a>
								</li>
								<li
									onClick={() =>
										handleChangeForm("model", "70b")
									}
								>
									<a>Llama3 70b</a>
								</li>
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
