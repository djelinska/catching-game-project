import { PiMagnifyingGlassFill, PiPlusBold } from 'react-icons/pi';

import Button from '@/components/common/Button';
import FormInput from '@/components/form/FormInput';

const AddFriends = () => {
	return (
		<div className='card-container'>
			<h2 className='h-[68px] flex items-center'>Add Friends</h2>
			<div className='flex space-x-6'>
				<FormInput
					icon={PiMagnifyingGlassFill}
					placeholder='Search friend'
					type='text'
				/>
				<Button label='Search' color='secondary' size='large' />
			</div>
		</div>
	);
};

export default AddFriends;
