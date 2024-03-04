import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isAuthenticated, children }) {
  if (isAuthenticated) {
    return children;
  } else {
    <Navigate to="/Account"></Navigate>;
  }
}
