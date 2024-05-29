import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import AppRoutes from "./routes/AppRoutes";
import Dashboard from "./scenes/dashboard";
// Trong App
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box display="flex" flexDirection="row">
            <SideBar />
            <Box width="100%">
              <Topbar />
              <AppRoutes />
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;
