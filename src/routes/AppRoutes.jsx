import { Route, Routes } from "react-router-dom";
import Login from "../scenes/login/Login";
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "../scenes/dashboard/Dashboard";
import User from "../scenes/user/Users";
import Categories from "../scenes/category/categories";
import Layout from "../scenes/layout/Layout"; // Ensure you import the correct Layout component
import Product from "../scenes/product/Products";
import Order from "../scenes/order/order";
import Contacts from "../scenes/contact/contact";

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
            <Route path="/product" element={<Product />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contacts" element={<Contacts/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
