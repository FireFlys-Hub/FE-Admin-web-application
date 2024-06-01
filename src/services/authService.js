import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { UserContext } from '../context/auth/UserContext';
import axios from '../custom/axios';

const useAuthService = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [tokenExpires, setTokenExpires] = useState(null);
    const {login, logout, user} = useContext(UserContext);
    const token =  user.token;
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
                const email = res.data.user.email;
                console.log("THis i access token",accessToken);
                setUserData(user);
                let data = {
                    isAuthenticated:true,
                    token: accessToken,
                    email: email,
                };
                login(data);
                return user; // Trả về user khi đăng nhập thành công
            } else {
                setUserData(null);
                return false; // Trả về false khi đăng nhập không thành công
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError(err);
            setUserData(null);
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
            const res = await axios.get('http://127.0.0.1:8000/api/logout', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.status === true) {
                logout();
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
