const MessageInput = ({ name, value, type, onChangeAction }) => {
	return (
		<textarea
			rows='1'
			placeholder={type === 'message' ? 'Write message' : 'Write comment'}
			name={name}
			value={value}
			onChange={onChangeAction}
			className='w-full resize-none px-8 py-6 bg-green-300 border-0 uppercase text-white text-base rounded-lg placeholder:text-green-100 focus:ring-0 focus:border-none'
		></textarea>
	);
};

export default MessageInput;
