import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  console.log("PrivateRoute: isAuthenticated =", isAuthenticated);

  if (typeof isAuthenticated !== "boolean") {
    console.error(
      "PrivateRoute: isAuthenticated is not a boolean, redirecting to login."
    );
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated === undefined) {
    console.error(
      "PrivateRoute: isAuthenticated is undefined, redirecting to login."
    );
    return <Navigate to="/login" replace />;
  }

  if (!isAuthenticated) {
    console.log(
      "PrivateRoute: User is not authenticated, redirecting to login."
    );
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
