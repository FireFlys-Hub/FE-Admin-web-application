import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../scenes/login/Login";
import Dashboard from "../scenes/dashboard";
import PageNotFound from "../scenes/error/PageNotFound";
import PrivateRoutes from "./PrivateRoutes";
import User from "../scenes/user/Users";


const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoutes exact path='/' component={Dashboard} />
        <PrivateRoutes path='/user' component={User} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
};


export default AppRoutes;
