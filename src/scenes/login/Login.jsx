import { useTheme } from '@emotion/react';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/auth/UserContext';
import useAuthService from '../../services/authService';
import { tokens } from '../../theme';
import { message } from 'antd';



const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { postLogin, error } = useAuthService();
    const { user } = useContext(UserContext);
    useEffect(()=>{
        if(user.isAuthenticated === true){
            navigate('/');
        }
        // eslint-disable-next-line
    },[])
    const handleLogin = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!email) {
            setEmailError('Email không được để trống');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Email không hợp lệ');
            isValid = false;
        } else {
            setEmailError('');
        }
        if (!password) {
            setPasswordError('Mật khẩu không được để trống');
            isValid = false;
        } else {
            setPasswordError('');
        }
        if (isValid) {
            const result = await postLogin(email, password);
            console.log(result);
            if (result) {
                message.success('Login successfully!')
                navigate('/');
            } else {
                console.log('Login failed', error);
                message.error('Incorrect email or password. Please login again');
            }
        }
    };

    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!value) {
            setEmailError('Email không được để trống');
        } else if (!validateEmail(value)) {
            setEmailError('Email không hợp lệ');
        } else {
            setEmailError('');
        }
    };

    const handleChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (!value) {
            setPasswordError('Mật khẩu không được để trống');
        } else {
            setPasswordError('');
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === "Enter") {
            handleLogin(event);
        }
    };

    return (
        <Grid container component="main" className="flex justify-center items-center min-h-screen">
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1} square>
                <div className="p-8 flex-col items-center text-center justify-center">
                    <div className="flex flex-col items-center justify-center" style={{ flexDirection: "column" }}>
                        <Avatar className="bg-secondary mb-4">
                            <LockOpenOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ fontSize: "32px", fontWeight: "600" }}>
                            Sign in
                        </Typography>
                    </div>
                    <form className="w-full mt-4" noValidate onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                      con   autoFocus
                            className="mb-4"
                            value={email}
                            onChange={handleChangeEmail}
                            error={Boolean(emailError)}
                            helperText={emailError}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            className="mb-4"
                            value={password}
                            onChange={handleChangePassword}
                            error={Boolean(passwordError)}
                            helperText={passwordError}
                            onKeyDown={handlePressEnter}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: colors.blueAccent[500],
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: colors.blueAccent[700],
                                },
                                marginTop: "20px"
                            }}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default Login;
