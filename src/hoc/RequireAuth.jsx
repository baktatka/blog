import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";

const RequireAuth = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default RequireAuth;
