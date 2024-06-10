import React from 'react'
import { Link } from 'react-router-dom'

const SurveyCard = ({ survey }) => {
    return (
        <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4">
                    <span className="bg-gray-200 text-gray-800 text-xs font-bold px-2 py-1 rounded-lg">
                        {survey?.category}
                    </span>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{survey.title}</h3>

                    </div>
                    <p className="text-gray-700 text-base">{`${survey.description.slice(0, 80) }...`}</p>
                </div>
                <div className="px-6 py-4 bg-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-gray-700 text-sm ml-2">Votes: {survey.yesCount+survey.noCount}</span>
                    </div>
                    <Link to={`/survey/details/${survey._id}`}>
                        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                            Details
                        </button>
                    </Link>
                </div>
            </div></div>
    )
}

export default SurveyCard