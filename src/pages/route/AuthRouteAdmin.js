import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRouteAdmin = () => {
  if (localStorage.getItem("admintoken") !== null) {
    return <Navigate to="/admin/home" />;
  }

  return <Outlet />;
};

export default AuthRouteAdmin;
