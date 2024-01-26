'use client';

import Button from '@/components/common/Button';
import FormInput from '@/components/form/FormInput';
import InlineError from '@/components/common/InlineError';
import LoadingMessage from '@/components/common/LoadingMessage';
import { PiMagnifyingGlassFill } from 'react-icons/pi';
import UsersList from '@/components/friends/UsersList';
import useSearch from '@/hooks/useSearch';
import { useState } from 'react';

const AddFriends = () => {
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
			{isLoading && <LoadingMessage message='Loading users...' />}
			{error && <InlineError error={error} />}
			{users && <UsersList users={users} />}
		</div>
	);
};

export default AddFriends;
