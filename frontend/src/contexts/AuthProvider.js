'use client';

import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const initialUserState = {
	username: '',
	password: '',
};

function authReducer(state, action) {
	switch (action.type) {
		case 'LOGIN_USER':
			return {
				...state,
				username: action.username,
				password: action.password,
			};
		case 'LOGOUT_USER':
			return initialUserState;
		default:
			return state;
	}
}

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		username: '',
		password: '',
	});

	function loginUser(username, password) {
		dispatch({
			type: 'LOGIN_USER',
			username: username,
			password: password,
		});
	}

	function logoutUser() {
		dispatch({ type: 'LOGOUT_USER' });
	}

	return (
		<AuthContext.Provider value={{ state, loginUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
