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
import PaymentPage from "../Pages/PaymentPage";
import PrivetRoute from "./PrivetRoute";

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
            {
                path: 'payment',
                element:<PaymentPage/>
            }

        ],

    },
    {
        path: '/dashboard/surveyor',
        element: <PrivetRoute> <DashBoardPage /></PrivetRoute>,
        children: [
            {
                path: 'create',
                element: <PrivetRoute><CreateSurveyPage /></PrivetRoute>
            },
            {
                path: 'update/:id',
                element: <PrivetRoute><UpdateSurveyPage /></PrivetRoute>
            },
            {
                path: 'surveys',
                element: <PrivetRoute><AllSurveyPage /></PrivetRoute>
            },
            {
                path: 'surveys/:id',
                element: <PrivetRoute> <IndividualSurveyDetails /></PrivetRoute>
            }
        ]
    },
    {
        path: '/dashboard/admin',
        element: <PrivetRoute><AdminDashboard /></PrivetRoute>,
        children: [
            {
                path: 'users',
                element: <PrivetRoute><ManageUsers /></PrivetRoute>
            },
            {
                path: 'surveys',
                element: <PrivetRoute><ManageSurveys /></PrivetRoute>
            },
            {
                path: 'payments',
                element: <PrivetRoute><ManagePayments /></PrivetRoute>
            }
        ]
    },
    {
        path: `/dashboard/user`,
        element: <PrivetRoute><UserDashboard /></PrivetRoute>,
        children: [
            {
                path: 'surveys',
                element: <PrivetRoute><UserParticipatedPage /></PrivetRoute>
            },
            {
                path: 'my-reports',
                element: <PrivetRoute><MyReportPage /></PrivetRoute>
            },
            {
                path: 'comments',
                element: <PrivetRoute><UserComments /></PrivetRoute>
            }
        ]
    },
    {
        path: `/dashboard/pro_user`,
        element: <PrivetRoute><UserDashboard /></PrivetRoute>,
        children: [
            {
                path: 'surveys',
                element: <PrivetRoute><UserParticipatedPage /></PrivetRoute>
            },
            {
                path: 'my-reports',
                element: <PrivetRoute><MyReportPage /></PrivetRoute>
            },
            {
                path: 'comments',
                element: <PrivetRoute><UserComments /></PrivetRoute>
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