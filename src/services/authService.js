import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { UserContext } from '../context/auth/UserContext';
import axios from '../custom/axios';

const useAuthService = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const { login, logout, user } = useContext(UserContext);
    const token = user.token;

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
    };

    const postLogin = async (email, password) => {
        try {
            const res = await axios.post('/login', {
                email: email,
                password: password
            });
            if (res.status === true && res.user.role === 1) {
                const accessToken = res.authorization.access_token;
                const email = res.user.email;
                setUserData(res.user);
                setAuthToken(accessToken, res.authorization.refresh_token, 6000000); // 10 minutes
                login({
                    isAuthenticated: true,
                    token: accessToken,
                    email: email,
                });
                return res.user; // Trả về user khi đăng nhập thành công
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

    const getLogout = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/logout', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.status === true) {
                logout();
                // Xóa cookies khi logout
                Cookies.remove('authToken');
                Cookies.remove('refreshToken');
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error('Error during logout:', err);
            return false;
        }
    };
    // Hàm để làm mới token
    const reLogin = async (refreshToken) => {
        try {
            const response = await axios.post('/refresh', { refresh_token: refreshToken });
            const accessToken = response.data.authorization.access_token;
            const newRefreshToken = response.data.authorization.refresh_token;
            const expiresInMilliseconds = 600000; // 10 minutes
            // Cập nhật token mới trong cookies
            Cookies.set('authToken', accessToken, {
                expires: new Date(Date.now() + expiresInMilliseconds),
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict'
            });
            Cookies.set('refreshToken', newRefreshToken, {
                expires: new Date(Date.now() + 60 * 1000), // 1 minute
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict'
            });
            console.log("đã gọi refresh");
            return accessToken; // Trả về token mới
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error; // Ném ra lỗi nếu không thể làm mới token
        }
    };

    return { user: userData, error, postLogin, getLogout, reLogin };
};

export default useAuthService;
