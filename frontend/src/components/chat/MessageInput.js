const MessageInput = ({ name, value, onChangeAction }) => {
	return (
		<textarea
			rows='1'
			placeholder='Write message'
			name={name}
			value={value}
			onChange={onChangeAction}
			className='w-full resize-none px-8 py-6 bg-green-300 border-0 uppercase text-white text-base rounded-lg placeholder:text-green-100 focus:ring-0 focus:border-none'
		></textarea>
	);
};

export default MessageInput;
