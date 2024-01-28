import { PiHeartBreakFill } from 'react-icons/pi';
import { PiHeartFill } from 'react-icons/pi';
import { useGameInfo } from '../../context/GameProvider';

const Hearts = () => {
	const { state } = useGameInfo();

	return (
		<div className='flex space-x-6'>
			{state.hearts === 0 ? (
				<PiHeartBreakFill style={{ fontSize: '40px', color: '#d1462f' }} />
			) : (
				[...Array(3)].map((heart, index) => (
					<PiHeartFill
						key={index}
						style={{
							fontSize: '40px',
							color: state.hearts > index ? '#d1462f' : '#3f7267',
						}}
					/>
				))
			)}
		</div>
	);
};

export default Hearts;
