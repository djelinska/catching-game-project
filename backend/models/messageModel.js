const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	receiver: {
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

module.exports = mongoose.model('Message', messageSchema);
