import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard/Dashboard";
import User from "./scenes/user/Users";
import { AuthLayout, DashboardLayout, ProtectedRoute,PublicRoute } from "./routes/AppRoutes";
import Login from "./scenes/login/Login";
import useAuthService from './services/authService';

function App() {
    const [theme, colorMode] = useMode();
    const [user, setUser ] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('account');
        if (token) {
            setUser(true);
        }
    }, []);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Routes>
                        <Route path="/login" element={<PublicRoute user={user}><AuthLayout /></PublicRoute>}>
                            <Route index element={<Login />} />
                        </Route>
                        <Route path="/" element={<ProtectedRoute user={user}><DashboardLayout /></ProtectedRoute>}>
                            <Route index element={<Dashboard />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="user" element={<User />} />
                        </Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
