const FormInput = ({
	icon: IconComponent,
	placeholder,
	type,
	name,
	value,
	onChangeAction,
	onBlurAction,
}) => {
	return (
		<div className='w-full bg-green-300 text-green-100 flex items-center space-x-4 px-8 rounded-lg'>
			{IconComponent && <IconComponent style={{ color: '#bcc9af' }} />}
			<input
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChangeAction}
				onBlur={onBlurAction}
				className='autofill:bg-yellow-200 w-full px-0 py-6 bg-green-300 border-0 uppercase text-white text-base rounded-lg placeholder:text-green-100 focus:ring-0 focus:border-none'
			/>
		</div>
	);
};

export default FormInput;
