const Button = ({
	typeSubmit,
	label,
	icon: IconComponent,
	color,
	size,
	additionalStyles,
	onClickAction,
}) => {
	const colors = {
		primary: 'bg-yellow-light shadow-yellow-dark',
		secondary: 'bg-green-200 shadow-green-300',
	};

	const paddingAndRadiusSizes = {
		small: 'px-6 py-4 rounded',
		large: 'px-8 py-6 rounded-lg',
	};

	const paddingAndRadiusSizesOnlyIcon = {
		small: 'p-4 rounded',
		large: 'p-6 rounded-lg',
	};

	const style = `${colors[color]} ${
		label ? paddingAndRadiusSizes[size] : paddingAndRadiusSizesOnlyIcon[size]
	} ${additionalStyles ? additionalStyles : ''}`;

	return (
		<div>
			<button
				className={`shadow bg-${color} ${style}`}
				type={typeSubmit ? 'submit' : 'button'}
				onClick={onClickAction}
			>
				<div className='flex items-center justify-center space-x-4 min-h-9'>
					{IconComponent && <IconComponent />}
					{label && (
						<p
							className={
								'uppercase text-base text-white font-semibold text-nowrap whitespace-nowrap'
							}
						>
							{label}
						</p>
					)}
				</div>
			</button>
		</div>
	);
};

export default Button;
