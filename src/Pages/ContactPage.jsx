import React from 'react'

const ContactPage = () => {
  return (
    <div>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-700">We'd love to hear from you! Please fill out the form below to get in touch with us.</p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-start">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Details</h3>
                <p className="text-gray-700 mb-4"><strong>Email:</strong> contact@example.com</p>
                <p className="text-gray-700 mb-4"><strong>Phone:</strong> (123) 456-7890</p>
                <p className="text-gray-700 mb-4"><strong>Office Hours:</strong> Mon - Fri, 9am - 5pm</p>
                <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mt-4">
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

            <div className="md:w-1/2 md:pl-12">
              <form className="bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                  <textarea
                    id="message"
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage