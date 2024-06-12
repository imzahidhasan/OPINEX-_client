import React from 'react'
import Hero from '../Components/Hero'
import SectionHeading from '../Components/SectionHeading'
import { useQuery } from '@tanstack/react-query'
import api from '../hooks/useAxios'
import SurveyCard from '../Components/SurveyCard'

const HomePage = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['features_survey'], queryFn: async () => {
            const result = await api.get('/get_features_surveys')
            return result.data
        }
    })
    const { data: latest_survey, isLoading: latest_Loading } = useQuery({
        queryKey: ['latest_survey'],
        queryFn: async () => {
            const result = await api.get('/get_latest_survey')
            return result.data
        }
    })

    return (
        <div className='bg-gray-100 p-2'>
            <Hero />
            <div className='my-4'>
                <SectionHeading heading={'Features Surveys'} subheading={"Discover the unique features that make our surveys powerful and user-friendly"} />
            </div>
            {
                isLoading ? <div className='h-screen flex justify-center items-center'><span className="loading loading-dots loading-lg"></span></div> : <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {
                        data?.map((survey, index) => <SurveyCard key={index} survey={survey} />)
                    }
                </div>
            }
            <div className='my-4'>
                <SectionHeading heading={'Latest Surveys'} subheading={'Discover the most recent surveys added to our platform.'} />
            </div>
            {latest_Loading ? <div className='h-screen flex justify-center items-center'><span className="loading loading-dots loading-lg"></span></div> :
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {
                        latest_survey?.map((survey, index) => <SurveyCard key={index} survey={survey} />)
                    }
                </div>
            }
            <div className='my-6'>
                <SectionHeading heading={'How It Works '} subheading={`Easily create, distribute, and analyze surveys with our platform. Here's how it works: `} />
            </div>
            <div>
                <div className="bg-gray-100 py-12 ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className=" grid grid-cols-1 gap-y-16 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
                            <div className="text-center shadow-xl p-8">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                                    <span className="text-2xl font-semibold">1</span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    Create a Survey
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    Start by creating your own custom survey. Define the questions, set up options, and choose the format that best suits your needs.
                                </p>
                            </div>
                            <div className="text-center shadow-xl p-8">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                                    <span className="text-2xl font-semibold">2</span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    Take a Survey
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    Users participate by answering the survey questions. They can provide feedback, opinions, and preferences based on their experiences.
                                </p>
                            </div>
                            <div className="text-center shadow-xl p-8">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                                    <span className="text-2xl font-semibold">3</span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    Analyze Results
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    Dive into the data collected from the survey responses. Analyze trends, gather insights, and make data-driven decisions based on the results.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <SectionHeading heading={'Frequently Asked Questions'} subheading={`Got questions? We've got answers. Check out our FAQs below.`} />
            </div>
            <div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        How do I create a survey?
                    </div>
                    <div className="collapse-content">
                        <p>You can create a survey by signing up for an account and using our intuitive survey builder tool. Simply follow the steps to add questions, customize the design, and distribute your survey to your audience.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        Can I customize the look and feel of my surveys?
                    </div>
                    <div className="collapse-content">
                        <p>Yes, our platform allows you to customize the design of your surveys to match your branding. You can choose colors, fonts, and add your logo to make your surveys visually appealing and engaging.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        How do I distribute my survey to respondents?
                    </div>
                    <div className="collapse-content">
                        <p>Once you've created your survey, you can distribute it through various channels such as email, social media, or embedding it on your website. You can also generate a unique link to share with your audience.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        Can I track responses in real-time?
                    </div>
                    <div className="collapse-content">
                        <p>Yes, our platform provides real-time analytics to track responses as they come in. You can monitor participation rates, view responses, and analyze data to gain insights into your audience's opinions and preferences.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        Is my data secure?
                    </div>
                    <div className="collapse-content">
                        <p>We take data security seriously. Our platform employs industry-standard encryption and security measures to protect your data. We also offer options for anonymizing responses and complying with data privacy regulations.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        Can I export survey data for further analysis?
                    </div>
                    <div className="collapse-content">
                        <p>Yes, you can export survey data in various formats such as CSV or Excel for further analysis. This allows you to manipulate and visualize the data using your preferred tools or software.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        What types of surveys can I create?
                    </div>
                    <div className="collapse-content">
                        <p>Our platform supports a wide range of survey types, including multiple-choice, open-ended, rating scales, and more. You can choose the type of questions that best suit your research objectives and audience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage