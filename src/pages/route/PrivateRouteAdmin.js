import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteAdmin = () => {
  const user = useSelector((state)=>state.user)
  console.log(user)
  if (localStorage.getItem("admintoken") === null && user.role !== "") {
    return <Navigate to="/admin" />;
  }

  return <Outlet />;
};

export default PrivateRouteAdmin;
