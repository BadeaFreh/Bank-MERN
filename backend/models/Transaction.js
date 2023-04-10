const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
	amount: {
		type: Number,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	vendor: {
		type: String,
		required: true
	}
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
