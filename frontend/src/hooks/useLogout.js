import axios from "axios";
import { useState } from "react";
import configDev from "../configs";
import { useAuthContext } from "../contexts/AuthProvider";

export default function useLogout() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
    const { user } = useAuthContext();
 
	const logout = async () => {
		setLoading(true);

        const options = {
			url: configDev["BACKEND_URL"] + "/auth/logOut",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-client-id": user._id,
			},
			withCredentials: true,
		};

		return await axios
			.request(options)
			.then((response) => response.data)
			.catch((err) => {
				console.log(err);
				setError(err?.response?.data?.message || "Error occured!");
				return null;
			})
			.finally(() => {
				setLoading(false);
				setError(null);
			});
	};

	return { logout, loading, error };
}
