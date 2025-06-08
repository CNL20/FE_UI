import React from "react";
import { Navigate } from "react-router-dom";

interface RoleBasedRouteProps {
  children: React.ReactNode;
  role: string;
  userRole: string;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  role,
  userRole,
}) => {
  console.log("RoleBasedRoute: userRole =", userRole, "role =", role);

  if (userRole === undefined) {
    return <Navigate to="/" replace />;
  }

  if (!userRole || typeof userRole !== "string") {
    return <Navigate to="/" replace />;
  }

  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  if (userRole === "admin" && role === "admin") {
    console.log("Admin-specific route detected, allowing access.");
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
