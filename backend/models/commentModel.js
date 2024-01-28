const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	author_username: {
		type: String,
		required: true,
	},
	profile_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	edited: {
		type: Boolean,
		default: false,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: { type: Date },
});

module.exports = mongoose.model('Comment', commentSchema);
