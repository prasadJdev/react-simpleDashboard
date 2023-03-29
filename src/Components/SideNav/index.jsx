import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function index() {
  return (
      <div className='d-flex'>
    <ul className='sideNavebar'>
      <li>
        <Link to="dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="users">Users</Link>
      </li>
      <li>
        <Link to="products">Products</Link>
      </li>
      <li>
        <Link to="setting">Setting</Link>
      </li>
    </ul>
    <div className='siteContent'>
    <Outlet/>
    </div>
    </div>
  )
}
