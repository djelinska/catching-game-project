const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
	speed: {
		type: String,
		enum: ['const', 'dec', 'rand'],
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	sender_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	sender_score: {
		type: Number,
		default: 0,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Challenge', challengeSchema);
