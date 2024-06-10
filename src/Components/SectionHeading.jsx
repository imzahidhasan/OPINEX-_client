import React from 'react'

const SectionHeading = ({ heading, subheading }) => {
    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{heading}</h2>
                {subheading && <p className="text-gray-700">{subheading}</p>}
            </div>
        </div>
    )
}

export default SectionHeading