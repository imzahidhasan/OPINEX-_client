import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Firebase/useAuth';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut, setUser, setUserRole } = useAuth()
    const handleLogOut = () => {
        logOut()
        setUser('')
        setUserRole('')
    }
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-3xl  font-bold text-gray-800">
                                OPINEX
                            </Link>
                        </div>
                        <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? `text-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-indigo-500`
                                    :
                                    'text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-indigo-500'}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/surveys"
                                className={({ isActive }) => isActive ? `text-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-indigo-500`
                                    :
                                    'text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-indigo-500'}
                            >
                                Surveys
                            </NavLink>
                            <NavLink
                                to="/pricing"
                                className={({ isActive }) => isActive ? `text-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-indigo-500`
                                    :
                                    'text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-indigo-500'}
                            >
                                Pricing
                            </NavLink>
                            <NavLink
                                to="/about"
                                className={({ isActive }) => isActive ? `text-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-indigo-500`
                                    :
                                    'text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-indigo-500'}
                            >
                                About
                            </NavLink>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) => isActive ? `text-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-indigo-500`
                                    :
                                    'text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-indigo-500'}
                            >
                                Contact
                            </NavLink>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) => isActive ? `text-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-indigo-500`
                                    :
                                    'text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-indigo-500'}
                            >
                                Dashboard
                            </NavLink>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {
                            user ? <button onClick={handleLogOut} className="ml-4 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">Log Out</button> : <>
                                <Link
                                    to="/login"
                                    className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-indigo-500"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="ml-4 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                                >
                                    Register
                                </Link></>
                        }
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-800 focus:text-white"
                            aria-expanded={isOpen ? 'true' : 'false'}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            <svg className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="pt-2 pb-3 space-y-1">
                    <Link
                        to="/"
                        className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 bg-indigo-50 border-indigo-500"
                    >
                        Home
                    </Link>
                    <Link
                        to="/surveys"
                        className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 bg-indigo-50 border-indigo-500"
                    >
                        Surveys
                    </Link>
                    <Link
                        to="/pricing"
                        className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 bg-indigo-50 border-indigo-500"
                    >
                        Pricing
                    </Link>
                    <Link
                        to="/about"
                        className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 bg-indigo-50 border-indigo-500"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 bg-indigo-50 border-indigo-500"
                    >
                        Contact
                    </Link>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                    <Link
                        to="/login"
                        className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 bg-indigo-50 border-indigo-500"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 bg-indigo-50 border-indigo-500"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
