import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRoutes"; 
import { ColorModeContext, useMode } from "./theme";

function App() {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <AppRouter />
                </Router>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
