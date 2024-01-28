import { PiPaperPlaneRightFill, PiPenFill, PiTrashFill } from 'react-icons/pi';
import { useEffect, useState } from 'react';

import Button from '../components/common/Button';
import FriendMessage from '../components/chat/FriendMessage';
import MessageInput from '../components/chat/MessageInput';
import UsernameDisplay from '../components/common/UsernameDisplay';
import { useAuthContext } from '../context/AuthProviver';
import useDelete from '../hooks/useDelete';
import useFetch from '../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import usePost from '../hooks/usePost';
import useUpdate from '../hooks/useUpdate';

const Chat = () => {
	const [messageInput, setMessageInput] = useState('');
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userId = searchParams.get('userId');
	const { fetchData } = useFetch();
	const { postData } = usePost();
	const { updateData } = useUpdate();
	const { deleteData } = useDelete();

	const startedChatsUsernames = ['friend1', 'friend2'];
	const [messages, setMesages] = useState(null);
	const { user } = useAuthContext();
	const [updatedMessageId, setUpdatedMessageId] = useState(null);

	const getMessages = async () => {
		const messages = await fetchData(`messages/${userId}`);
		setMesages(messages);
	};

	const handleSendMessage = async () => {
		if (messageInput !== '' && !updatedMessageId) {
			await postData('messages', {
				content: messageInput,
				receiverId: userId,
			});
		}

		if (messageInput !== '' && updatedMessageId) {
			console.log('Aktualizuj', messageInput, updatedMessageId);
			await updateData('messages', {
				messageId: updatedMessageId,
				newContent: messageInput,
			});
			setUpdatedMessageId(null);
		}

		getMessages();
		setMessageInput('');
	};

	const handleDeleteMessage = async (id) => {
		await deleteData(`messages/${id}`);
		getMessages();
	};

	useEffect(() => {
		handleSendMessage();
	}, [updatedMessageId]);

	useEffect(() => {
		if (user) {
			getMessages();
		}
	}, [user]);

	return (
		<div className='card-container'>
			<h2 className='h-[68px] flex items-center'>Chat</h2>
			<div className='w-full flex flex-col justify-end'>
				{messages && (
					<div className='flex flex-col space-y-6 max-h-[668px] overflow-y-scroll pb-3'>
						{messages.map((message) => (
							<>
								{message.receiver !== userId && (
									<FriendMessage key={message._id} message={message} />
								)}
								{message.receiver === userId && (
									<div className='grow items-end flex flex-col space-y-4 mr-2'>
										<div className='flex items-center gap-4'>
											<UsernameDisplay
												username={message.sender_username}
												iconBackground={true}
												size='small'
												reversed={true}
												profilePath={true}
											/>
											<button onClick={() => setUpdatedMessageId(message._id)}>
												<PiPenFill />
											</button>
											<button onClick={() => handleDeleteMessage(message._id)}>
												<PiTrashFill />
											</button>
										</div>
										<div className='shadow-card bg-green-400 rounded px-6 py-4 max-w-lg'>
											<p className='text-sm'>{message.content}</p>
										</div>
									</div>
								)}
							</>
						))}
					</div>
				)}
				<div className='bg-green-500 pt-4 flex items-center space-x-6'>
					<MessageInput
						name='message'
						value={messageInput}
						onChangeAction={(e) => setMessageInput(e.target.value)}
					/>
					<Button
						icon={PiPaperPlaneRightFill}
						color='primary'
						size='large'
						onClickAction={handleSendMessage}
					/>
				</div>
			</div>
		</div>
	);
};

export default Chat;
