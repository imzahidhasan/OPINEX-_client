import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import SurveyPage from "../Pages/SurveyPage";
import AboutPage from "../Pages/AboutPage";
import ContactPage from "../Pages/ContactPage";
import PricingPage from "../Pages/PricingPage";
import SurveyDetailsPage from "../Pages/SurveyDetailsPage";
import DashBoardPage from "../Pages/DashBoardPage";
import CreateSurveyPage from "../Pages/CreateSurveyPage";
import UpdateSurveyPage from "../Pages/UpdateSurveyPage";
import AllSurveyPage from "../Pages/AllSurveyPage";
import IndividualSurveyDetails from "../Pages/IndividualSurveyDetails";
import AdminDashboard from "../Pages/AdminDashboard";
import ManageUsers from "../Pages/ManageUsers";
import ManageSurveys from "../Pages/ManageSurveys";
import ManagePayments from "../Pages/ManagePayments";
import UserDashboard from "../Pages/UserDashboard";
import UserParticipatedPage from "../Pages/UserParticipatedPage";
import MyReportPage from "../Pages/MyReportPage";
import UserComments from "../Pages/UserComments";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'Register',
                element: <RegisterPage />
            },
            {
                path: 'surveys',
                element: <SurveyPage />
            },
            {
                path: 'pricing',
                element: <PricingPage />
            },
            {
                path: 'about',
                element: <AboutPage />
            },
            {
                path: 'contact',
                element: <ContactPage />
            },
            {
                path: 'survey/details/:id',
                element: <SurveyDetailsPage />
            },

        ],

    },
    {
        path: '/dashboard/surveyor',
        element: <DashBoardPage />,
        children: [
            {
                path: 'create',
                element: <CreateSurveyPage />
            },
            {
                path: 'update/:id',
                element: <UpdateSurveyPage />
            },
            {
                path: 'surveys',
                element: <AllSurveyPage />
            },
            {
                path: 'surveys/:id',
                element: <IndividualSurveyDetails />
            }
        ]
    },
    {
        path: '/dashboard/admin',
        element: <AdminDashboard />,
        children: [
            {
                path: 'users',
                element: <ManageUsers />
            },
            {
                path: 'surveys',
                element: <ManageSurveys />
            },
            {
                path: 'payments',
                element: <ManagePayments />
            }
        ]
    },
    {
        path: '/dashboard/user',
        element: <UserDashboard />,
        children: [
            {
                path: 'surveys',
                element: <UserParticipatedPage />
            },
            {
                path: 'my-reports',
                element: <MyReportPage />
            },
            {
                path: 'comments',
                element: <UserComments />
            }
        ]
    }

])

export default router


/**
*admin
admin@opinex.com
pass:adminadmin

surveyor
surveyor@opinex.com
pass:opinexsurveyor
*/