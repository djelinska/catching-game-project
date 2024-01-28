import { useAuthContext } from '../context/AuthProviver';
import { useState } from 'react';

const useUpdate = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const { user } = useAuthContext();

	const updateData = async (endpoint, data) => {
		setIsLoading(true);
		setError('');
		setMessage('');

		const response = await fetch(`http://localhost:3001/api/${endpoint}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
			body: JSON.stringify(data),
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

	return { updateData, isLoading, message, error };
};

export default useUpdate;
