import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';
import InlineError from '../components/common/InlineError';
import LoadingMessage from '../components/common/LoadingMessage';
import { PiMagnifyingGlassFill } from 'react-icons/pi';
import UsersList from '../components/friends/UsersList';
import useSearch from '../hooks/useSearch';
import { useState } from 'react';

const AddFriend = () => {
	const [users, setUsers] = useState(null);
	const { searchData, isLoading, error } = useSearch();
	const [searchValue, setSearchValue] = useState('');

	const handleSearch = async (e) => {
		e.preventDefault();
		setUsers(null);

		if (!isLoading) {
			const users = await searchData(searchValue);
			setUsers(users);
		}
	};

	return (
		<div className='card-container'>
			<h2 className='h-[68px] flex items-center'>Add New Friends</h2>
			<form className='flex space-x-6' onSubmit={handleSearch} method='GET'>
				<FormInput
					icon={PiMagnifyingGlassFill}
					placeholder='Search friend'
					type='text'
					value={searchValue}
					onChangeAction={(e) => setSearchValue(e.target.value)}
				/>
				<Button
					typeSubmit={true}
					label='Search'
					color='secondary'
					size='large'
					onClickAction={handleSearch}
				/>
			</form>
			{isLoading && <LoadingMessage />}
			{error && <InlineError error={error} />}
			{users && users.length > 0 && <UsersList users={users} />}
		</div>
	);
};

export default AddFriend;
