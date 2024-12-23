import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

function PrivateRoute({ children }) {
  return auth.currentUser ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
