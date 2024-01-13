const GameChoiceButton = ({ icon: IconComponent, label, onClickAction }) => {
	return (
		<div className='w-full text-center'>
			<button
				className='w-full bg-green-200 px-6 py-4 rounded shadow shadow-green-300'
				onClick={onClickAction}
			>
				<div className='flex items-center justify-center space-x-4 min-h-9'>
					{IconComponent && <IconComponent style={{ fontSize: '40px' }} />}
					{label && (
						<p className='uppercase text-lg text-white text-nowrap font-semibold min-w-14 text-right'>
							{label}
						</p>
					)}
				</div>
			</button>
		</div>
	);
};

export default GameChoiceButton;
