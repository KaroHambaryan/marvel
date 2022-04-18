

import { getDocs } from "firebase/firestore";
import { useCallback, useState } from "react";

export function useHttp2() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(async (url) => {
		setLoading(true);

		try {
			let response = await getDocs(url)

			if (!response.docs.length) {
				throw new Error(`Karo jan data.length ${response.docs.length}, check the reset data`);
			}

			const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			setLoading(false);

			return data;
		}catch (e) {
			setLoading(false);
			setError(e.message);
			throw e;
		}

	}, [])

	const clearError = useCallback(() => setError(null), []);

	return {  loading, request, error, clearError}
}