import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';

import AddFriend from './pages/AddFriend';
import Chat from './pages/Chat';
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
					<Route
						path='/game/challenge'
						element={user ? <Game /> : <Navigate to='/' />}
					/>
					<Route
						path='/game/accept/challenge'
						element={user ? <Game /> : <Navigate to='/' />}
					/>
					<Route
						path='/friends'
						element={user ? <Friends /> : <Navigate to='/' />}
					/>
					<Route
						path='/friends/add'
						element={user ? <AddFriend /> : <Navigate to='/' />}
					/>
					<Route
						path='/notifications'
						element={user ? <Notifications /> : <Navigate to='/' />}
					/>
					<Route
						path='/leaderboard'
						element={user ? <LeaderBoard /> : <Navigate to='/' />}
					/>
					<Route
						path='/profile/:username'
						element={user ? <UserProfile /> : <Navigate to='/' />}
					/>
					<Route
						path='/edit'
						element={user ? <EditProfile /> : <Navigate to='/' />}
					/>
					<Route path='/chat' element={user ? <Chat /> : <Navigate to='/' />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
