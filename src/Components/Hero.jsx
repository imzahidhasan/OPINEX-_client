import React from 'react'

const Hero = () => {
    return (
        <div>
            <div className="relative bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: "url('https://i.ibb.co/4NVNfgR/choong-deng-xiang-WXQm-NTK0-U-unsplash.jpg')" }}>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
                <div className="relative z-10 p-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">"Empower Your Decisions with
                    <br className='hidden md:block'/>    Data-Driven Insights"</h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300">"Create, share, and analyze surveys effortlessly with our intuitive platform. <br className='hidden md:block' /> Join our community to gather valuable feedback and make informed decisions."</p>
                    <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700">
                        Explore Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero