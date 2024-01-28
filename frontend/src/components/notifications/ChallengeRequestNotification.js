import Button from '../common/Button';
import ChallengeGameChoice from './ChallengeGameChoice';
import { PiArrowsHorizontalFill } from 'react-icons/pi';
import { PiCatFill } from 'react-icons/pi';
import { PiShuffleSimpleFill } from 'react-icons/pi';
import { PiTrendDownFill } from 'react-icons/pi';
import UsernameDisplay from '../common/UsernameDisplay';
import { useAuthContext } from '../../context/AuthProviver';
import { useNavigate } from 'react-router-dom';
import useUpdate from '../../hooks/useUpdate';

const ChallengeRequestNotification = ({ notificationObject, afterAction }) => {
	const speed = notificationObject.challenge.speed;
	const challengeIcon =
		speed === 'const'
			? PiArrowsHorizontalFill
			: speed === 'dec'
			? PiTrendDownFill
			: PiShuffleSimpleFill;
	const { updateData, isLoading } = useUpdate();
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const handleRejectChallengeRequest = async () => {
		if (user && !isLoading) {
			await updateData('challenges/request/reject', {
				notificationId: notificationObject._id,
				challengeId: notificationObject.challenge.id,
			});
			afterAction();
		}
	};

	const handleAcceptChallengeRequest = () => {
		const challengeId = notificationObject.challenge.id;
		const notificationId = notificationObject._id;
		const quantity = notificationObject.challenge.quantity;
		const speed = notificationObject.challenge.speed;

		navigate(
			`/game/accept/challenge?notificationId=${notificationId}&challengeId=${challengeId}&quantity=${quantity}&speed=${speed}`
		);
	};

	return (
		<div className='bg-green-400 rounded p-6 flex items-center justify-center gap-6 mr-2'>
			<div className='flex items-center space-x-6'>
				<UsernameDisplay
					username={notificationObject.sender_username}
					size='large'
				/>
				<p>challenges you</p>
			</div>
			<div className='flex items-center space-x-6'>
				<ChallengeGameChoice
					icon={PiCatFill}
					quantity={notificationObject.challenge.quantity}
				/>
				<ChallengeGameChoice
					icon={challengeIcon}
					speed={notificationObject.challenge.speed}
				/>
				<Button
					label='Accept'
					color='primary'
					size='small'
					onClickAction={handleAcceptChallengeRequest}
				/>
				<Button
					label='Delete'
					color='secondary'
					size='small'
					onClickAction={handleRejectChallengeRequest}
				/>
			</div>
		</div>
	);
};

export default ChallengeRequestNotification;
