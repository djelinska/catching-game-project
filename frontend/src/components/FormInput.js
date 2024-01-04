const FormInput = ({ icon: IconComponent, placeholder, type }) => {
	return (
		<div className='bg-green-300 text-green-100 flex items-center space-x-4 px-8 rounded-lg'>
			{IconComponent && <IconComponent style={{ color: '#bcc9af' }} />}
			<input
				type={type}
				placeholder={placeholder}
				className='w-full px-0 py-6 bg-green-300 border-0 uppercase text-white text-base rounded-lg placeholder:text-green-100 focus:ring-0 focus:border-none'
			/>
		</div>
	);
};

export default FormInput;
