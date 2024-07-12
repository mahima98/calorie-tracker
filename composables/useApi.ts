export default function useApi() {
	const config = useRuntimeConfig();
	const toast = useToast();

	const API_ENDPOINT_PARSER = config.public.apiEndPoint;

	async function fetchFoodList(ingr: string) {
		console.log('API_ENDPOINT_PARSER-', API_ENDPOINT_PARSER);
		const paramsObj = {
			app_id: config.public.apiAppIdSecret,
			app_key: config.public.apiAppKeySecret,
			ingr: ingr,
		};

		const searchParams = new URLSearchParams(paramsObj);

		try {
			const response = await fetch(API_ENDPOINT_PARSER + searchParams);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			return data?.parsed;
		}
		catch (error) {
			// Show a toast notification error
			toast.add({ title: 'API ERROR', description: `Error fetching data`, color: 'red', timeout: 3000 });
			console.error('Error fetching data:', error);
			throw error;
		}
	};

	return {
		fetchFoodList,
	};
}
