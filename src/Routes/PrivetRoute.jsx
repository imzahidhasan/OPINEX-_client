import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Firebase/FirebaseProvider';

const PrivetRoute = ({ children }) => {
    const location = useLocation();
    const { user, userLoading } = useContext(AuthContext);
    
    if (userLoading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default PrivetRoute;
