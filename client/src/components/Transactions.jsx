import React from 'react'
import TransactionItem from './TransactionItem'
import Navbar from './Navbar'
import { v4 as uuidv4 } from 'uuid';

const Transactions = ({transactions, balance, deleteTransaction}) => {
  return (
    <>
    <Navbar balance={balance}/>
    <div className='transactions-container'>
      {
        transactions.map(t => 
          <TransactionItem 
            id={t._id}
            key={uuidv4()}
            transaction={t}
            deleteTransaction={deleteTransaction}
          />)
      }
    </div>
    </>
  )
}

export default Transactions