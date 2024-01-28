import Cookies from 'js-cookie';
import { useAuthContext } from '../context/AuthProviver';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
	const { logoutUser } = useAuthContext();
	const navigate = useNavigate();

	const logout = () => {
		Cookies.remove('user');
		logoutUser();
		navigate('/');
	};

	return { logout };
};

export default useLogout;
