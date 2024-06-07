import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
      <div>
          <div className='flex container mx-auto'>
              <div className="bg-gray-100 w-[20%] min-h-screen">
                  <aside className="bg-blue-400 h-screen shadow">
                      <nav className="p-4">
                          <ul className="space-y-2">
                              <li>
                                  <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : 'text-gray-600 font-bold'}>
                                      Home
                                  </NavLink>
                              </li>
                              <li>
                                  <NavLink to={`/dashboard/admin/users`} className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : 'text-gray-600 font-bold'}>
                                      Manage User
                                  </NavLink>
                              </li>
                              <li>
                                  <NavLink to={'/dashboard/admin/surveys'} className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : 'text-gray-600 font-bold'}>
                                     Manage Surveys
                                  </NavLink>
                              </li>
                              <li>
                                  <NavLink to={'/dashboard/admin/payments'} className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : 'text-gray-600 font-bold'}>
                                     MAnage Payments
                                  </NavLink>
                              </li>
                          </ul>
                      </nav>
                  </aside>
              </div>
              <div className='w-[80%] p-5'>
                  <Outlet />
              </div>
          </div>
    </div>
  )
}

export default AdminDashboard