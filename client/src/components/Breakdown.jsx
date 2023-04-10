import React from 'react'
import Navbar from './Navbar'
import { v4 as uuidv4 } from 'uuid';

const Breakdown = ({categoriesAmounts, balance}) => {

  return (
    <>
      <Navbar balance={balance}/>
      <div className='breakdown-container'>
        <h3 className='breakdown-title'>Break Down</h3>
        {categoriesAmounts.map(c => {
          return (
            <div key={uuidv4()} className='category-spent-amount'>
              <div className='category-spent-amount-row'>
                <p>{c.category}</p>
                <p>{c.amount}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Breakdown