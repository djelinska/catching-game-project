'use client';

import { useAuth } from '@/contexts/AuthProvider';
import { useState } from 'react';

const useAuthorize = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { loginUser } = useAuth();

	const authorize = async (formData, pathName) => {
		setIsLoading(true);

		const response = await fetch(`http://localhost:3001/${pathName}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData),
		});

		const responseBody = await response.json();

		if (!response.ok) {
			const errorsArray = Array.isArray(responseBody.message);
			setIsLoading(false);

			if (errorsArray) {
				const errorsObject = responseBody.message.reduce((errObject, error) => {
					errObject[error.path] = error.msg || '';
					return errObject;
				}, {});

				throw { authErrors: errorsObject };
			} else {
				throw { authError: responseBody.message };
			}
		} else {
			localStorage.setItem('user', JSON.stringify(responseBody));
			loginUser(formData.username, formData.password);
			setIsLoading(false);
		}
	};

	return { authorize, isLoading };
};

export default useAuthorize;
