import React from 'react'

const AboutPage = () => {
  return (
    <div>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 md:px-12">
          {/* About Us Section */}
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src="https://i.ibb.co/hXGLmKv/jason-goodman-vbxy-Fxlgpj-M-unsplash.jpg"
                alt="About Us"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                About Us
              </h2>
              <p className="text-gray-700 mb-4">
                Founded in 2020, our company has been dedicated to providing top-notch services to our clients. Our journey began with a small team of passionate individuals, and over the years, we've grown into a well-respected organization in our industry.
              </p>
              <p className="text-gray-700">
                Our mission is to deliver excellence in everything we do. We believe in the power of innovation and the importance of customer satisfaction. Our values are rooted in integrity, commitment, and teamwork.
              </p>
            </div>
          </div>

          {/* Location Section */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Location
              </h2>
              <p className="text-gray-700 mb-4">
                1234 Elm Street, Springfield, IL 62704
              </p>
              <p className="text-gray-700">
                We are located in the heart of the city, easily accessible by all modes of transport. Drop by for a visit!
              </p>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345099876!2d144.95592331550403!3d-37.81720974202114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d3d7fbb8e650!2sVictoria%20State%20Library%20of%20Victoria!5e0!3m2!1sen!2sau!4v1592437891766!5m2!1sen!2sau"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage