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
  // Added console log to debug 'userRole' and 'role' in RoleBasedRoute
  if (userRole === undefined) {
    console.error(
      "RoleBasedRoute: userRole is undefined, redirecting to home."
    );
    return <Navigate to="/" replace />;
  }

  if (!userRole || typeof userRole !== "string") {
    console.error(
      "RoleBasedRoute: userRole is not defined or not a string, redirecting to home."
    );
    return <Navigate to="/" replace />;
  }

  if (userRole !== role) {
    console.log(
      `RoleBasedRoute: User role (${userRole}) does not match required role (${role}), redirecting to home.`
    );
    return <Navigate to="/" replace />;
  }

  console.log(
    "RoleBasedRoute: User role matches required role, rendering children."
  );

  return <>{children}</>;
};

export default RoleBasedRoute;
