const mongoose = require('mongoose');
const wareHouseSchema = new mongoose.Schema({
	location: {
		type: String,
		required: true,
	},
});

//export model
module.exports = mongoose.model('Warehouse', wareHouseSchema);
