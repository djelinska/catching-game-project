import Link from 'next/link';
import { PiUserFill } from 'react-icons/pi';

const UsernameDisplay = ({
	username,
	iconBackground,
	size,
	date,
	time,
	reversed,
	profilePath,
}) => {
	const sizes = {
		small: 'p-2 rounded-sm',
		large: 'p-4 rounded',
	};

	return (
		<div
			className={`flex items-center gap-6 ${
				reversed ? 'flex-row-reverse' : 'flex-row'
			}`}
		>
			<div
				className={`${iconBackground ? 'bg-green-100' : 'bg-transparent p-0'} ${
					sizes[size]
				}`}
			>
				<PiUserFill
					style={{ fontSize: `${size === 'small' ? '20px' : '32px'}` }}
				/>
			</div>
			{profilePath ? (
				<Link href={`profile`}>
					<p>{username}</p>
				</Link>
			) : (
				<p>{username}</p>
			)}
			{date && <p className='text-xs'>Joined {date}</p>}
			{time && <p className='text-xs'>{time}</p>}
		</div>
	);
};

export default UsernameDisplay;
