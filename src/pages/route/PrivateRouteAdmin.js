import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteAdmin = () => {
  const user = useSelector((state)=>state.user)
  const logged = useSelector((state)=>state.logged)
  console.log(logged)
  if (localStorage.getItem("admintoken") === null && !logged) {
    return <Navigate to="/admin" />;
  }
  return <Outlet />;
};

export default PrivateRouteAdmin;
