import { useAuthContext } from '@/contexts/AuthProvider';
import { useRouter } from 'next/navigation';

const useLogout = () => {
	const { logoutUser } = useAuthContext();
	const router = useRouter();

	const logout = () => {
		localStorage.removeItem('user');
		logoutUser();
		router.push('/');
	};

	return { logout };
};

export default useLogout;
