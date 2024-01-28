import { createContext, useContext, useEffect, useReducer } from 'react';

import Cookies from 'js-cookie';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

function authReducer(state, action) {
	switch (action.type) {
		case 'LOGIN_USER':
			return {
				user: action.payload,
			};
		case 'LOGOUT_USER':
			return { user: null };
		default:
			return state;
	}
}

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	});

	useEffect(() => {
		const userCookie = Cookies.get('user');

		if (userCookie) {
			const user = JSON.parse(userCookie);
			loginUser(user);
		}
	}, []);

	function loginUser(user) {
		dispatch({
			type: 'LOGIN_USER',
			payload: user,
		});
	}

	function logoutUser() {
		Cookies.remove('user');
		dispatch({ type: 'LOGOUT_USER' });
	}

	return (
		<AuthContext.Provider value={{ ...state, loginUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
