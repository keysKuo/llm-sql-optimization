import axios from "axios";
import { useState } from "react";
import configs from "../configs";

export default function useUpload() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const upload = async (file) => {
		setLoading(true);
        const formData = new FormData();
		formData.append("file", file);

        const options = {
			url: configs["CREWAI_URL"] + "/upload",
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data: formData,
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

	return { upload, loading, error };
}
