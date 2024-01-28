import { PiPaperPlaneRightFill, PiPenFill, PiTrashFill } from 'react-icons/pi';
import { useEffect, useState } from 'react';

import Button from '../components/common/Button';
import MessageInput from '../components/chat/MessageInput';
import TotalScore from '../components/game/TotalScore';
import UserStatsLabels from '../components/leaderboard/UserStatsLabels';
import UsernameDisplay from '../components/common/UsernameDisplay';
import { useAuthContext } from '../context/AuthProviver';
import useDelete from '../hooks/useDelete';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import usePost from '../hooks/usePost';
import useUpdate from '../hooks/useUpdate';

const UserProfile = () => {
	const [profile, setProfile] = useState(null);
	const { fetchData, isLoading, error } = useFetch();
	const { user } = useAuthContext();
	const { username } = useParams();
	const [comments, setComments] = useState(null);
	const [commentInput, setCommentInput] = useState('');
	const { postData } = usePost();
	const { updateData } = useUpdate();
	const { deleteData } = useDelete();
	const [updatedCommentId, setUpdatedCommentId] = useState(null);

	const getUserProfile = async () => {
		const profile = await fetchData(`users/profile/${username}`);
		setProfile(profile);
	};

	const getComments = async () => {
		const comments = await fetchData(`comments/${username}`);
		setComments(comments);
	};

	const handleAddComment = async () => {
		console.log(commentInput);

		if (commentInput !== '' && !updatedCommentId) {
			await postData('comments', {
				profileUsername: username,
				content: commentInput,
			});
		}

		if (commentInput !== '' && updatedCommentId) {
			await updateData('comments', {
				commentId: updatedCommentId,
				newContent: commentInput,
			});
			setUpdatedCommentId(null);
		}

		getComments();
		setCommentInput('');
	};

	const handleDeleteComment = async (id) => {
		await deleteData(`comments/${id}`);
		getComments();
	};

	useEffect(() => {
		handleAddComment();
	}, [updatedCommentId]);

	useEffect(() => {
		if (user && !isLoading) {
			getUserProfile();
			getComments();
		}
	}, [user]);

	const getMonthName = (monthNumber) => {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		return months[monthNumber - 1];
	};

	return (
		<div className='card-container'>
			<h2 className='h-[68px] flex items-center'>Profile</h2>
			{profile && (
				<>
					<div className='bg-green-400 p-6 rounded flex flex-col gap-6 items-center'>
						<UsernameDisplay
							username={profile.username}
							iconBackground={true}
							size='large'
							date={`${getMonthName(profile.month)} ${profile.year}`}
						/>
						<TotalScore totalScore={profile.stats.total_score} />
					</div>
					<div className='grid grid-cols-6 gap-2'>
						<UserStatsLabels leaderboard={false} />
					</div>
					<div className='grid grid-cols-6 gap-2'>
						<p className='text-center'>{profile.stats.play_count}</p>
						<p className='text-center'>
							{profile.stats.const_speed_total_score}
						</p>
						<p className='text-center'>{profile.stats.dec_speed_total_score}</p>
						<p className='text-center'>
							{profile.stats.rand_speed_total_score}
						</p>
						<p className='text-center'>0</p>
						<p className='text-center'>0</p>
					</div>
					<h2>Comments</h2>
					{comments && (
						<>
							<div className='flex flex-col gap-4'>
								{comments.map((comment) => (
									<div key={comment._id} className='p-4 bg-green-400 rounded'>
										{comment.author_username === user.username && (
											<div className='flex gap-4 mb-2'>
												<button
													onClick={() => setUpdatedCommentId(comment._id)}
												>
													<PiPenFill />
												</button>
												<button
													onClick={() => handleDeleteComment(comment._id)}
												>
													<PiTrashFill />
												</button>
											</div>
										)}
										<p>{comment.content}</p>
									</div>
								))}
							</div>
							<div className='bg-green-500 pt-4 flex items-center space-x-6'>
								<MessageInput
									name='message'
									value={commentInput}
									type='comment'
									onChangeAction={(e) => setCommentInput(e.target.value)}
								/>
								<Button
									icon={PiPaperPlaneRightFill}
									color='primary'
									size='large'
									onClickAction={handleAddComment}
								/>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default UserProfile;
