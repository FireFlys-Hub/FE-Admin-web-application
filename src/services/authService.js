import { useState, useEffect } from 'react';
import axios from '../custom/axios';
import Cookies from 'js-cookie';

const useAuthService = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [tokenExpires, setTokenExpires] = useState(null);

    const setAuthToken = (accessToken, refreshToken, expiresInMilliseconds) => {
        const expiresDate = new Date(Date.now() + expiresInMilliseconds);
        Cookies.set('authToken', accessToken, {
            expires: expiresDate,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        Cookies.set('refreshToken', refreshToken, {
            expires: new Date(Date.now() + 60 * 1000), // 1 minute
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        setTokenExpires(expiresDate);
    };

    const postLogin = async (email, password) => {
        try {
            const res = await axios.post('/login', {
                email: email,
                password: password
            });
            console.log(res);
    
            if (res.data.status === true && res.data.user.role === 1) {
                const user = res.data.user;
                const accessToken = res.data.authorization.access_token;
                console.log("THis i access token",accessToken);
                const refreshToken = res.data.authorization.refresh_token;
                const expiresInMilliseconds = 60 * 1000; // 10 seconds
                setUser(user);
                let data = {
                    isAuthenticated:true,
                    token: accessToken
                }
                sessionStorage.setItem('account',JSON.stringify(data))
                return true; // Trả về user khi đăng nhập thành công
            } else {
                setUser(null);
                return false; // Trả về false khi đăng nhập không thành công
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError(err);
            setUser(null);
            return false; // Trả về false nếu xảy ra lỗi
        }
    };
    

    const refreshAccessToken = async () => {
        try {
            const refreshToken = Cookies.get('refreshToken');
            const response = await axios.post('/refresh', { refresh_token: refreshToken });

            const newAccessToken = response.data.authorization.access_token;
            const newRefreshToken = response.data.authorization.refresh_token;
            const expiresInMilliseconds = 10 * 1000; // 10 seconds

            setAuthToken(newAccessToken, newRefreshToken, expiresInMilliseconds);
        } catch (error) {
            console.error('Error refreshing token:', error);
            setError(error);
            getLogout(); // Logout if unable to refresh token
        }
    };

    const getLogout = async () => {
        try {
            const token = JSON.parse(sessionStorage.getItem('account')).token;
            const res = await axios.get('http://127.0.0.1:8000/api/logout', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.status === true) {
                sessionStorage.removeItem('account');
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error('Error during logout:', err);
            return false;
        }
    };

    return { user, error, postLogin, getLogout, refreshAccessToken };
};

export default useAuthService;
