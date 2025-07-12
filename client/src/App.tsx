import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { UserRole } from "./types";
import { ROUTES, STORAGE_KEYS } from "./constants";
import AdminRouter from "./router/adminRouter";
import ParentRouter from "./router/parentRouter";
import ManagerRouter from "./router/managerRouter";
import NurseRouter from "./router/nurseRouter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DiseasePrevention from "./pages/DiseasePrevention";
import NutritionGuide from "./pages/NutritionGuide";
import MentalHealthCare from "./pages/MentalHealthCare";

function App() {
  // Session: check for expiry (30 minutes, can adjust)
  const [authState, setAuthState] = useState(() => {
    const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const savedRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE) as UserRole | null;
    const savedTime = localStorage.getItem('AUTH_TIMESTAMP');
    const currentTime = Date.now();
    const sessionExpiry = 1800000; // 30 minutes
    if (savedAuth && savedRole && savedTime) {
      const timeDiff = currentTime - parseInt(savedTime);
      if (timeDiff < sessionExpiry) {
        return {
          isAuthenticated: true,
          userRole: savedRole,
        };
      }
    }
    // Expired or missing, clear
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    localStorage.removeItem('AUTH_TIMESTAMP');
    return {
      isAuthenticated: false,
      userRole: "",
    };
  });

  const navigate = useNavigate();
  // Nếu bạn không dùng location trong logic, hãy xoá dòng này:
  // const location = useLocation();

  // Update localStorage on authState change
  useEffect(() => {
    if (authState.isAuthenticated) {
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, authState.userRole);
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    }
  }, [authState.isAuthenticated, authState.userRole]);

  const handleLogin = useCallback((role: UserRole) => {
    // Set token (dummy if not from backend), role, timestamp
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'temp_token');
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
    localStorage.setItem('AUTH_TIMESTAMP', Date.now().toString());
    setAuthState({ isAuthenticated: true, userRole: role });
    navigate(`/${role}/dashboard`);
  }, [navigate]);
  const handleLogout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    localStorage.removeItem('AUTH_TIMESTAMP');
    setAuthState({ isAuthenticated: false, userRole: "" });
    navigate(ROUTES.HOME);
  }, [navigate]);

  // ProtectedRoute
  const ProtectedRoute = useCallback(({
    children,
    requiredRole
  }: {
    children: React.ReactNode;
    requiredRole?: UserRole;
  }) => {
    if (!authState.isAuthenticated) {
      return <Navigate to={ROUTES.LOGIN} replace />;
    }
    if (requiredRole && authState.userRole !== requiredRole) {
      return <Navigate to={`/${authState.userRole}/dashboard`} replace />;
    }
    return <>{children}</>;
  }, [authState.isAuthenticated, authState.userRole]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<Home isAuthenticated={authState.isAuthenticated} />} />
      <Route
        path={ROUTES.LOGIN}
        element={
          authState.isAuthenticated
            ? <Navigate to={`/${authState.userRole}/dashboard`} replace />
            : <Login onLogin={handleLogin} />
        }
      />

      {/* Admin */}
      <Route
        path={ROUTES.ADMIN.DASHBOARD + '/*'}
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminRouter onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* Public Health Info */}
      <Route path="/disease-prevention" element={<DiseasePrevention />} />
      <Route path="/nutrition-guide" element={<NutritionGuide />} />
      <Route path="/mental-health-care" element={<MentalHealthCare />} />

      {/* Manager */}
      <Route
        path={`${ROUTES.MANAGER.DASHBOARD}/*`}
        element={
          <ProtectedRoute requiredRole="manager">
            <ManagerRouter onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* Nurse */}
      <Route
        path={`${ROUTES.NURSE.DASHBOARD}/*`}
        element={
          <ProtectedRoute requiredRole="nurse">
            <NurseRouter onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* Parent */}
      <Route
        path={`${ROUTES.PARENT.DASHBOARD}/*`}
        element={
          <ProtectedRoute requiredRole="parent">
            <ParentRouter onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default App;