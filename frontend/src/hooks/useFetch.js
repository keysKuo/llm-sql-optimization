import axios from "axios";
import { useState } from "react";

export default function useFetch() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetch = async (options) => {
		setLoading(true);
		return await axios
			.request(options)
			.then((response) => response.data)
			.catch((err) => {
				console.log(err);
				setError(err);
				return null;
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return { fetch, loading, error };
}
