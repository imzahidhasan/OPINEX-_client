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
            }
        ]
    },

])

export default router