import Button from '../Button';
import CurrentCatQuantity from './CurrentCatQuantity';
import CurrentSpeedChoice from './CurrentSpeedChoice';
import Link from 'next/link';
import { PiArrowFatLeftFill } from 'react-icons/pi';

const GameTopNav = () => {
	return (
		<div className='w-full absolute top-0 left-0 px-6 flex items-center justify-between space-x-6'>
			<Link href='/register'>
				<Button label='Register' color='secondary' size='small' />
			</Link>
			<Link href='/login'>
				<Button label='Login' color='secondary' size='small' />
			</Link>
			{/* <CurrentCatQuantity currentQuantity='0' totalQuantity='15' />
			<CurrentSpeedChoice speed='const' /> */}
			{/* <Button
				icon={PiArrowFatLeftFill}
				color='primary'
				size='small'
				fontSize='base'
			/> */}
		</div>
	);
};

export default GameTopNav;
