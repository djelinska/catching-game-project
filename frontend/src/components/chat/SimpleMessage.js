const SimpleMessage = ({ isFriendMessage, body }) => {
	return (
		<div
			className={`${
				isFriendMessage ? 'border-3 border-green-300' : 'shadow-card'
			} bg-green-400 rounded px-6 py-4 max-w-lg`}
		>
			<p className='text-sm'>{body}</p>
		</div>
	);
};

export default SimpleMessage;
