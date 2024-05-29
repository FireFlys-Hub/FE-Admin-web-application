import React from "react";
import { Outlet,Navigate } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import { Box } from "@mui/material";
import SideBar from "../scenes/global/Sidebar";

const AuthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
const DashboardLayout = ({ children }) => {
  return (
    <>
      <Box display="flex" flexDirection="row">
        <SideBar />
        <Box width="100%">
          <Topbar />
          <main>
          <Outlet />
          </main>
        </Box>
      </Box>
    </>
  );
};
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
const PublicRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};
export  {AuthLayout , DashboardLayout,ProtectedRoute,PublicRoute};
