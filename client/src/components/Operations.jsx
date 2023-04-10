import React, {useState} from 'react'
import Navbar from './Navbar'

const Operations = ({balance, handleOperation}) => {
  const [vendor, setVendor] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')

  function handleAmount(e) {
    setAmount(e.target.value)
  }

  function handleVendor(e) {
    setVendor(e.target.value)
  }

  function handleCategory(e) {
    setCategory(e.target.value)
  }

  function handleDepositClick() {
    if (isNaN(amount)) {
      alert('amount is not a number')
    }
    else if (!amount || !vendor || !category) {
      alert('invalid inputs')
    }
    else {
      handleOperation(amount, vendor, category)
    }
    cleanInputs()
  }

  function handleWithdrawClick() {
    if (isNaN(amount)) {
      alert('amount is not a number')
    }
    else if (!amount || !vendor || !category) {
      alert('invalid inputs')
    }
    else {
      handleOperation(parseInt(amount * -1), vendor, category)
    }
    cleanInputs()
  }

  function cleanInputs() {
    setAmount('')
    setVendor('')
    setCategory('')
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <>
    <Navbar balance={balance} />
    <div className='operations-container'>
      <h3>Insert Transactions</h3>
      <form className='operations-form' onSubmit={handleSubmit}>
        <div className='transaction-amount-input transaction-input'>
          <input 
            placeholder='transaction amount'
            value={amount}            
            onChange={handleAmount}
          />
        </div>
        <div className='transaction-vendor-input transaction-input'>
          <input 
            placeholder='transaction vendor'
            value={vendor}
            onChange={handleVendor}
          />
        </div>
        <div className='transaction-category-input transaction-input'>
          <input 
            placeholder='transaction category'
            value={category}
            onChange={handleCategory}
          />
        </div>
        <div className='operation-buttons-wrapper'>
          <button 
            className='btn btn-success pl-3 pr-3 pt-0 pb-0' 
            onClick={handleDepositClick}>
            Deposit
          </button>
          <button 
            className='btn btn-danger pl-3 pr-3 pt-0 pb-0' 
            onClick={handleWithdrawClick}>
            Withdraw
          </button>
        </div>
      </form>
    </div>
    </>
  )
}

export default Operations
