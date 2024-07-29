import React, { createContext, useContext, useEffect, useState } from "react";
import useFetch from '../hooks/useFetch';
import "../firebase/config";
import configs from "../configs";

export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		const jsonUser = localStorage.getItem("user");
		return JSON.parse(jsonUser) || null;
	});
	const [chats, setChats] = useState([]);
	const [showLoading, setShowLoading] = useState(false);
	const { fetch, error, loading } = useFetch()
	
	useEffect(() => {
		const verifyAuth = async () => {
			const options = {
				url: configs['BACKEND_URL'] + '/auth/protected',
				method: 'GET',
				headers: {
					"Content-Type": "application/json",
					"x-client-id": user._id,
				},
				withCredentials: true,
			}

			const verified = await fetch(options);
			console.log(verified)
			if (!verified) {
				setUser(null);
				localStorage.clear();
			}
		}

		verifyAuth()
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, setUser, showLoading, setShowLoading, chats, setChats }}>
			{children}
		</AuthContext.Provider>
	);
}
