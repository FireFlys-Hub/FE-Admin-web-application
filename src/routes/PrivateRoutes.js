import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/auth/UserContext';

const PrivateRoute = () => {
    const { user } = useContext(UserContext);

    return user.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
