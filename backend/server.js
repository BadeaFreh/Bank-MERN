const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/transactions', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

const Transaction = require('./models/Transaction');

app.get('/transactions', async (req, res) => {
	const transactions = await Transaction.find()
	res.json(transactions)
})

app.get('/transactions/balance', async (req, res) => {
	const totalBalance = await Transaction.aggregate([{
		$group: {
			_id: "total balance",
			totalAmount: { $sum: "$amount" }
		}
	}])
	res.json(totalBalance)
})

app.get('/transactions/breakdown', async (req, res) => {
	const transactions = await Transaction.find()
	const categories = []
	for (let t of transactions) {
		if (!categories.includes(t.category)) {
			categories.push(t.category)
		}
	}
	let categoriesAmounts = []
	for (let category of categories) {
		let sum = 0
		for (let t of transactions) {
			if (t.category === category) {
				sum += t.amount
			}
		}
		categoriesAmounts.push({category: category, amount: sum})
	}
	res.json(categoriesAmounts)
})

app.post('/transactions/new', (req, res) => {
	const transaction = new Transaction({
		amount: req.body.amount,
		category: req.body.category,
		vendor: req.body.vendor
	})

	transaction.save();
	res.json(transaction);
});

app.delete('/transactions/delete/:id', async (req, res) => {
	const result = await Transaction.findByIdAndDelete(req.params.id);
	res.json(result);
});

app.listen(3333, function() {
    console.log('Listening on port 3333')
})
