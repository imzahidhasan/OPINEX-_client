import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import useAuth from '../Firebase/useAuth'

const UserDashboard = () => {
    const { userRole } = useAuth()
    return (
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
                                <NavLink to={`/dashboard/user/surveys`} className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : 'text-gray-600 font-bold'}>
                                    Participated Surveys
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/user/my-reports'} className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : 'text-gray-600 font-bold'}>
                                    My Reported Surveys
                                </NavLink>
                            </li>
                            {userRole === "pro_user" && <li>
                                <NavLink to={'/dashboard/user/comments'} className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : 'text-gray-600 font-bold'}>
                                    My Commented Surveys
                                </NavLink>
                            </li>
                            }
                        </ul>
                    </nav>
                </aside>
            </div>
            <div className='w-[80%] p-5'>
                <Outlet />
            </div>
        </div>
    )
}

export default UserDashboard