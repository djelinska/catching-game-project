import { PiPaperPlaneRightFill, PiSwordFill } from 'react-icons/pi';

import Button from '@/components/Button';
import ChallengeRequestMessage from '@/components/chat/ChallengeRequestMessage';
import ChallengeResultMessage from '@/components/chat/ChallengeResultMessage';
import ChatUsernamesList from '@/components/chat/ChatUsernamesList';
import FormInput from '@/components/FormInput';
import SimpleMessage from '@/components/chat/SimpleMessage';
import UsernameDisplay from '@/components/UsernameDisplay';

const Chat = () => {
	const messages = [
		{
			friendMessage: true,
			username: 'friend',
			type: 'simpleMessage',
			body: 'Lorem ipsum',
			time: '05-01-2024 10:00',
		},
		{
			friendMessage: false,
			username: 'user',
			type: 'simpleMessage',
			body: 'Lorem ipsum 2',
			time: '05-01-2024 10:01',
		},
		{
			friendMessage: true,
			username: 'friend',
			type: 'challengeReq',
			challQuan: 15,
			challSpeed: 'rand',
			time: '05-01-2024 10:02',
		},
		{
			friendMessage: false,
			username: 'user',
			type: 'challengeReq',
			challQuan: 15,
			challSpeed: 'rand',
			time: '05-01-2024 10:03',
		},
		{
			friendMessage: true,
			username: 'friend',
			type: 'challengeRes',
			challQuan: 15,
			challSpeed: 'rand',
			challengeWin: true,
			challScore: 15,
			challBonus: 2,
			time: '05-01-2024 10:04',
		},
		{
			friendMessage: false,
			username: 'user',
			type: 'challengeRes',
			challQuan: 15,
			challSpeed: 'rand',
			challengeWin: false,
			time: '05-01-2024 10:05',
		},
	];

	const startedChatsUsernames = ['friend1', 'friend2'];

	return (
		<div className='card-container-horizontal'>
			<div className='min-w-80'>
				<h2 className='h-[68px] flex items-center'>Chat</h2>
				<ChatUsernamesList startedChatsUsernames={startedChatsUsernames} />
			</div>
			<div className='w-full flex flex-col justify-end'>
				{messages.length > 0 && (
					<div className='flex flex-col space-y-6 max-h-[668px] overflow-y-scroll pb-3'>
						{messages.map((message, index) => (
							<div
								key={index}
								className={`flex flex-col space-y-4 mr-2 ${
									message.friendMessage ? 'items-start' : 'items-end'
								}`}
							>
								<UsernameDisplay
									username={message.username}
									iconBackground={true}
									size='small'
									time={message.time}
									reversed={!message.friendMessage}
									profilePath={true}
								/>
								{message.type === 'simpleMessage' ? (
									<SimpleMessage
										isFriendMessage={message.friendMessage}
										body={message.body}
									/>
								) : message.type === 'challengeReq' ? (
									<ChallengeRequestMessage
										isFriendMessage={message.friendMessage}
										challQuantity={message.challQuan}
										challSpeed={message.challSpeed}
									/>
								) : (
									<ChallengeResultMessage
										isFriendMessage={message.friendMessage}
										challQuantity={message.challQuan}
										challSpeed={message.challSpeed}
										challengeWin={message.challengeWin}
										challScore={message.challScore}
										challBonus={message.challBonus}
									/>
								)}
							</div>
						))}
					</div>
				)}
				<div className='bg-green-500 pt-4 flex items-center space-x-6'>
					<FormInput placeholder='Write message' type='text' />
					<Button icon={PiSwordFill} color='secondary' size='large' />
					<Button icon={PiPaperPlaneRightFill} color='primary' size='large' />
				</div>
			</div>
		</div>
	);
};

export default Chat;
