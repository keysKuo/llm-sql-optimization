import React, { useState } from "react";

export default function Recommend({ recommends, onSendMessage }) {
	return (
		<>
			{recommends?.length != 0 && (
				<div className="w-[70%] grid 2xl:grid-cols-4 grid-cols-2 items-center justify-center gap-4">
					{recommends?.map((r, idx) => {
						return (
							<div
								key={idx}
								onClick={() => {
									onSendMessage(r);
								}}
								className="text-[0.925rem] bg-[#E4E4FF] cursor-pointer hover:opacity-80 p-4 2xl:min-h-[150px] min-h-[100px] border border-gray-400 rounded-lg"
							>
								{r}
							</div>
						);
					})}
				</div>
			)}
		</>
	);
}
