import { Route, Routes } from "react-router-dom";
import Login from "../scenes/login/Login";
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "../scenes/dashboard/Dashboard";
import User from "../scenes/user/Users";
import Categories from "../scenes/category/categories";
import Layout from "../scenes/layout/Layout"; // Ensure you import the correct Layout component

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/user" element={<User />} />
            <Route path="/category" element={<Categories />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
