'use client';

import { useAuthContext } from '@/contexts/AuthProvider';
import { useState } from 'react';

const useDelete = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const { user } = useAuthContext();

	const deleteData = async (endpoint) => {
		setIsLoading(true);

		const response = await fetch(`http://localhost:3001/api/${endpoint}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});
		const responseBody = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(responseBody.error);
		} else {
			setIsLoading(false);
			setMessage(responseBody.message);
		}
	};

	return { deleteData, isLoading, message, error };
};

export default useDelete;
