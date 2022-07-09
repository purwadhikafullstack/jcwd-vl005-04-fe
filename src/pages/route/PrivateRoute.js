import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from "moment";

const PrivateRoute = () => {
  if (localStorage.getItem("access_token") === null) {
    return <Navigate to="/login" />;
  }

  const jwtToken = localStorage.getItem("access_token");
  const decoded = jwt_decode(jwtToken);
  if (decoded && decoded.keep_login !== true) {
    const tokenExp = moment().unix() > decoded.exp;
    if (tokenExp) {
      localStorage.removeItem("access_token");
      return <Navigate to="/login" />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
