import { useAuthContext } from '../context/AuthProviver';
import { useState } from 'react';

const usePost = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const { user } = useAuthContext();

	const postData = async (endpoint, data) => {
		setIsLoading(true);
		setError('');
		setMessage('');

		const response = await fetch(`http://localhost:3001/api/${endpoint}`, {
			method: 'POST',
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

	return { postData, isLoading, message, error };
};

export default usePost;
