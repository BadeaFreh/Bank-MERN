import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({balance}) => {
  return (
    <>
    <header>
        <nav className='nav'>
            <ul className="nav-links">
                <li>
                    <NavLink to="/transactions">Transactions</NavLink>
                </li>
                <li>
                    <NavLink to="/operations">Operations</NavLink>
                </li>
                <li>
                    <NavLink to="/breakdown">Breakdown</NavLink>
                </li>
            </ul>
            <div className='balance'>
                Balance: {balance}
            </div>
        </nav>
        
    </header>
    </>
  )
}

export default Navbar