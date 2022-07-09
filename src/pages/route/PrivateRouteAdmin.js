import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteAdmin = () => {
  if (localStorage.getItem("admintoken") === null) {
    return <Navigate to="/admin" />;
  }

  return <Outlet />;
};

export default PrivateRouteAdmin;
