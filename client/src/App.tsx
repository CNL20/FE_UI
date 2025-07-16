import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
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
import Explore from "./pages/Explore";
import LearnMore from "./pages/LearnMore";

// ĐÚNG ĐƯỜNG DẪN IMPORT COMPONENT NHẬP KẾT QUẢ KHÁM SỨC KHỎE!
import NurseHealthCheckResultForm from "./pages/NursePages/NurseHealthCheckResultForm";

function App() {
  const [authState, setAuthState] = useState(() => {
    const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const savedRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE) as UserRole | null;
    return {
      isAuthenticated: !!savedAuth,
      userRole: savedRole || "",
    };
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (authState.isAuthenticated) {
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, authState.userRole);
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    }
  }, [authState.isAuthenticated, authState.userRole]);

  const handleLogin = useCallback((role: UserRole) => {
    setAuthState({ isAuthenticated: true, userRole: role });
    navigate(`/${role}/dashboard`);
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    setAuthState({ isAuthenticated: false, userRole: "" });
    navigate(ROUTES.HOME);
  }, [navigate]);

  // Protected Route Component
  const ProtectedRoute = useCallback(({ 
    children, 
    requiredRole 
  }: { 
    children: React.ReactNode; 
    requiredRole?: UserRole;
  }) => {

    if (!authState.isAuthenticated) {
      return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    if (requiredRole && authState.userRole !== requiredRole) {
      return <Navigate to={`/${authState.userRole}`} replace />;
    }

    return <>{children}</>;
  }, [authState.isAuthenticated, authState.userRole, location]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<Home isAuthenticated={authState.isAuthenticated} />} />
        <Route path={ROUTES.LOGIN} element={authState.isAuthenticated ? <Navigate to={`/${authState.userRole}`} replace /> : <Login onLogin={handleLogin} />} />

        {/* Admin Routes */}
        <Route path={ROUTES.ADMIN.DASHBOARD + '/*'} element={<ProtectedRoute requiredRole="admin"><AdminRouter onLogout={handleLogout} /></ProtectedRoute>} />

        {/* Public Routes for Health Information */}
        <Route path="/disease-prevention" element={<DiseasePrevention />} />
        <Route path="/nutrition-guide" element={<NutritionGuide />} />
        <Route path="/mental-health-care" element={<MentalHealthCare />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/learn-more" element={<LearnMore />} />

        {/* Manager Routes */}
        <Route path={`${ROUTES.MANAGER.DASHBOARD}/*`} element={<ProtectedRoute requiredRole="manager"><ManagerRouter onLogout={handleLogout} /></ProtectedRoute>} />
        
        {/* Nurse Routes */}
        <Route path={`${ROUTES.NURSE.DASHBOARD}/*`} element={<ProtectedRoute requiredRole="nurse"><NurseRouter onLogout={handleLogout} /></ProtectedRoute>} />

        {/* Parent Routes */}
        <Route path={`${ROUTES.PARENT.DASHBOARD}/*`} element={<ProtectedRoute requiredRole="parent"><ParentRouter onLogout={handleLogout} /></ProtectedRoute>} />

        {/* ROUTE NHẬP KẾT QUẢ KHÁM SỨC KHỎE */}
        <Route
          path="/nurse/health-check-campaigns/:campaignId/student/:studentId"
          element={
            <ProtectedRoute requiredRole="nurse">
              <NurseHealthCheckResultForm />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;