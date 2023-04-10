import React, { useState, useEffect } from 'react'
import './components/css/App.css'
import {Route, Routes} from 'react-router-dom'
import Transactions from './components/Transactions'
import Operations from './components/Operations'
import Breakdown from './components/Breakdown'
import Home from './components/Home'
const API_BASE = 'http://localhost:3333';

const App = () => {
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [breakDown, setBreakDown] = useState([])

  useEffect(() => {
		getTransactions();
    getBalance()
    getBreakDown()
	}, []);

	const getTransactions = () => {
    fetch(API_BASE + '/transactions')
			.then(res => res.json())
			.then(data => {
        setTransactions(data)
      })
			.catch((err) => console.error("Error: ", err));
	}

  const getBalance = () => {
    fetch(API_BASE + '/transactions/balance')
      .then(res => res.json())
      .then(data => setBalance(data[0].totalAmount))
      .catch((err) => console.error("Error: ", err))
  }
  
  const getBreakDown = async () => {
    const data = await fetch(API_BASE + '/transactions/breakdown')
      .then(res => res.json())
    setBreakDown(data)
  }
  
  const handleOperation = async (amount, vendor, category) => {
		const data = await fetch(API_BASE + "/transactions/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				amount,
        vendor,
        category
			})
		}).then(res => res.json())
    setTransactions(prevTransactions => [...prevTransactions, data])
    setBalance(balance + data.amount)

    setBreakDown(prevBreakDown => {
      const index = prevBreakDown.findIndex(bd => bd.category === data.category)
      if (index === -1) {
        prevBreakDown.push({category: data.category, amount: data.amount})
      }
      else {
        prevBreakDown[index].amount += data.amount
      }
      return prevBreakDown
    })
	}

  const deleteTransaction = async id => {
    const data = await fetch(API_BASE + '/transactions/delete/' + id, {method: "DELETE"})
      .then(res => res.json())

    setTransactions(transactions => transactions.filter(t => t._id !== data._id))
    setBalance(balance - data.amount)

    setBreakDown(prevBreakDown => {
      const index = prevBreakDown.findIndex(bd => bd.category === data.category)
      prevBreakDown[index] = {category: data.category, amount: prevBreakDown[index].amount - data.amount}
      return prevBreakDown
    })
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home balance={balance} />} />
        <Route 
          path="/transactions" 
          element={
            <Transactions 
              transactions={transactions} 
              balance={balance}
              deleteTransaction={deleteTransaction}
            />} />
        <Route 
          path="/operations" 
          element={
            <Operations 
              balance={balance}
              handleOperation={handleOperation}
            />} 
        />
        <Route path="/breakdown" element={<Breakdown categoriesAmounts={breakDown} balance={balance}/>} />
      </Routes>
    </>
  )
}

export default App
