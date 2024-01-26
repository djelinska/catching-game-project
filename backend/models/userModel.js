const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		is_admin: {
			type: Boolean,
			default: false,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		friends: [
			{
				user_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				username: {
					type: String,
					required: true,
				},
				status: {
					type: String,
					enum: ['pending', 'accepted'],
					default: 'pending',
				},
			},
		],
		notifications: [
			{
				notification_type: {
					type: String,
					enum: ['friend_request', 'challenge_request', 'challenge_result'],
					required: true,
				},
				user_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				username: {
					type: String,
					required: true,
				},
			},
		],
		stats: {
			play_count: {
				type: Number,
				min: 0,
				default: 0,
			},
			total_score: {
				type: Number,
				min: 0,
				default: 0,
			},
			const_speed_total_score: {
				type: Number,
				min: 0,
				default: 0,
			},
			dec_speed_total_score: {
				type: Number,
				min: 0,
				default: 0,
			},
			rand_speed_total_score: {
				type: Number,
				min: 0,
				default: 0,
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
