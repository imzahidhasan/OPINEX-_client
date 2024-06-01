import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement:<ErrorPage/>
    },
    {
        index: true,
        element:<HomePage/>
    }
])

export default router