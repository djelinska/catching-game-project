import { createContext, useContext, useEffect, useRef, useState } from 'react';

import mqtt from 'mqtt';

const MQTTContext = createContext();
export const useMQTTContext = () => useContext(MQTTContext);

const MQTTProvider = ({ children }) => {
	const [currentTime, setCurrentTime] = useState(
		new Date().toLocaleTimeString()
	);
	const mqttClientRef = useRef();

	useEffect(() => {
		const mqttClient = mqtt.connect('mqtt://mqtt.eclipseprojects.io:80/mqtt');
		mqttClientRef.current = mqttClient;

		mqttClient.subscribe('time');

		mqttClient.on('message', (topic, message) => {
			setCurrentTime(message.toString());
		});

		return () => {
			mqttClient.unsubscribe('time');
			mqttClient.end();
		};
	}, []);

	return (
		<MQTTContext.Provider value={{ mqttClientRef, currentTime }}>
			{children}
		</MQTTContext.Provider>
	);
};

export default MQTTProvider;
