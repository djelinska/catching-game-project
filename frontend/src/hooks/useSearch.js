'use client';

import { useAuthContext } from '@/contexts/AuthProvider';
import { useState } from 'react';

const useSearch = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const { user } = useAuthContext();

	const searchData = async (searchQuery) => {
		setIsLoading(true);
		setError('');

		const response = await fetch(
			`http://localhost:3001/api/users?&query=${searchQuery}`,
			{
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
		);

		const responseBody = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(responseBody.error);
		} else {
			setIsLoading(false);
			return responseBody;
		}
	};

	return { searchData, isLoading, error };
};

export default useSearch;
