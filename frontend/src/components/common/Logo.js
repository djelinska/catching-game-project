import { Link } from 'react-router-dom';
import { PiCursorClickFill } from 'react-icons/pi';

const Logo = () => {
	return (
		<Link to='/' className='mr-auto'>
			<div className='w-full flex items-center justify-end space-x-4'>
				<span className='normal-case'>CATching GAME</span>
				<PiCursorClickFill />
			</div>
		</Link>
	);
};

export default Logo;
