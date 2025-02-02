import './styles/index.css';

import App from './App';
import AuthProvider from './context/AuthProviver';
import GameProvider from './context/GameProvider';
import MQTTProvider from './context/MQTTProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<MQTTProvider>
			<AuthProvider>
				<GameProvider>
					<App />
				</GameProvider>
			</AuthProvider>
		</MQTTProvider>
	</React.StrictMode>
);

reportWebVitals();
