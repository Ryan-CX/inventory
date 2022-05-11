const mongoose = require('mongoose');
const newItemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		toship: {
			type: Number,
			default: 0,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

//export model
module.exports = mongoose.model('Item', newItemSchema);
