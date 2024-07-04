import React, { useCallback, useEffect, useRef } from "react";
import Message from "../Message";
import Response from "../Response";

export default function ChatBox({ loading, messages }) {
    const chatBoxRef = useRef(null);

    const scrollToBottom = useCallback(() => {
		if (chatBoxRef.current) {
			chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
		}
	}, []);

    useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div
			ref={chatBoxRef}
			className="chatbox-content scroll-smooth overflow-y-scroll overflow-x-hidden w-full flex flex-1 flex-col items-start justify-between 2xl:px-5 px-7 py-2"
		>
			<div className="w-full flex flex-col items-start justify-between space-y-5">
				{messages.length === 0 ? (
					<div className="w-full h-[80svh] flex flex-col items-center justify-center">
						<img
							className="w-72"
							src="https://ezticket.io.vn/logo_2.png"
							alt=""
						></img>
					</div>
				) : (
					<>
						{messages?.map((mess, idx) => {
							return mess.type === "question" ? (
								<Message key={idx} message={mess} />
							) : (
								<Response key={idx} message={mess} />
							);
						})}

						{loading && (
							<Response
								message={"Đang xử lý"}
								isSkeleton={true}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
}
