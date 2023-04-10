import React from 'react'

const TransactionItem = ({ transaction: {vendor, amount, category}, id, deleteTransaction }) => {
  
  return (
    <div className='transaction-container' id={id}>
      <div className='transaction-row'>
        <p className='transaction-vendor'>{vendor}</p>
        <p 
          className={`transaction-amount bg-${amount < 0? 'danger': 'success'}`}
          >{amount}
        </p>
      </div>
      <div className='transaction-row'>
        <p className='transaction-category'>{category}</p>
        <div className='delete-btn-container'>
          <button 
            className='delete-transaction-btn btn btn-danger pl-3 pr-3 pt-0 pb-0'
            onClick={() => deleteTransaction(id)}
          >Delete</button>
        </div>
      </div>
    </div>
  )
}

export default TransactionItem