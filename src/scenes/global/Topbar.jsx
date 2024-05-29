import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from '@mui/material/Tooltip';
import useAuthService from "../../services/authService";
import { useNavigate } from "react-router-dom";
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const tooltipTitle = theme.palette.mode === 'dark' ? 'Set theme to Light' : 'Set theme to Dark';
  const {getLogout} = useAuthService();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logout = await getLogout();
    if (logout) {
      window.location.reload();
    }
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box display="flex">
        <Tooltip title={tooltipTitle}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton  onClick={handleLogout}>
            <ExitToAppOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;