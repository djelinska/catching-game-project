const ChallengeGameChoice = ({ icon: IconComponent, quantity, speed }) => {
	return (
		<div className='flex items-center space-x-4 text-lg'>
			{IconComponent && <IconComponent style={{ fontSize: '40px' }} />}
			<div className='flex items-center space-x-4 text-nowrap text-right'>
				{quantity && <p>{quantity}</p>}
				{speed && <p>{speed}</p>}
			</div>
		</div>
	);
};

export default ChallengeGameChoice;
