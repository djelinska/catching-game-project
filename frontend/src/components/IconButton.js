const IconButton = ({ icon: IconComponent }) => {
	return (
		<div className='p-4 rounded hover:bg-green-400 cursor-pointer'>
			{IconComponent && <IconComponent />}
		</div>
	);
};

export default IconButton;
