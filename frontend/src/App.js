import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';

import AddFriend from './pages/AddFriend';
import EditProfile from './pages/EditProfile';
import Friends from './pages/Friends';
import Game from './pages/Game';
import Home from './pages/Home';
import LeaderBoard from './pages/LeaderBoard';
import LoginPage from './pages/LoginPage';
import Navbar from './components/navbar/Navbar';
import Notifications from './pages/Notifications';
import RegisterPage from './pages/RegisterPage';
import UserProfile from './pages/UserProfile';
import { useAuthContext } from './context/AuthProviver';

function App() {
	const { user } = useAuthContext();

	return (
		<Router>
			<div className='w-full h-screen flex flex-col items-center justify-center'>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/register'
						element={!user ? <RegisterPage /> : <Navigate to='/' />}
					/>
					<Route
						path='/login'
						element={!user ? <LoginPage /> : <Navigate to='/' />}
					/>
					<Route path='/game/' element={<Game />} />
					<Route path='/game/challenge' element={<Game />} />
					<Route path='/game/accept/challenge' element={<Game />} />
					<Route path='/friends' element={<Friends />} />
					<Route path='/friends/add' element={<AddFriend />} />
					<Route path='/notifications' element={<Notifications />} />
					<Route path='/leaderboard' element={<LeaderBoard />} />
					<Route path='/profile/:username' element={<UserProfile />} />
					<Route path='/edit' element={<EditProfile />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
