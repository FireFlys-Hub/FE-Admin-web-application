import { Box } from "@mui/material";
import React from "react";
import SideBar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { Outlet } from "react-router-dom"; // Import Outlet

const Layout = () => {
  return (
      <div>
          <Box display="flex" flexDirection="row">
              <SideBar />
              <Box width="100%">
                  <Topbar />
                  <main>
                      <Outlet /> {/* Use Outlet to render child routes */}
                  </main>
              </Box>
          </Box>
      </div>
  );
}

export default Layout;
