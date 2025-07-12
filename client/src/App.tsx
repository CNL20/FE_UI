import React, { useState, useCallback } from "react";
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

<<<<<<< HEAD
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
=======
function App() {  const [authState, setAuthState] = useState(() => {
    const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const savedRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE) as UserRole | null;
    const savedTime = localStorage.getItem('AUTH_TIMESTAMP');
    
    // ✅ Kiểm tra thời gian hết hạn (1 giờ = 3600000ms)
    const currentTime = Date.now();
    const sessionExpiry = 1800000; // 1 giờ
    
    if (savedAuth && savedRole && savedTime) {
      const timeDiff = currentTime - parseInt(savedTime);
      
      // ✅ Nếu chưa hết hạn, restore session
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
      if (timeDiff < sessionExpiry) {
        return {
          isAuthenticated: true,
          userRole: savedRole,
        };
      }
    }
<<<<<<< HEAD
    // Expired or missing, clear
=======
    
    // ✅ Nếu hết hạn hoặc không hợp lệ, xóa sạch localStorage
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    localStorage.removeItem('AUTH_TIMESTAMP');
    return {
      isAuthenticated: false,
      userRole: "",
    };
  });

  const navigate = useNavigate();
<<<<<<< HEAD
  const location = useLocation();

  // Update localStorage on authState change
  useEffect(() => {
    if (authState.isAuthenticated) {
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, authState.userRole);
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    }
  }, [authState.isAuthenticated, authState.userRole]);
=======
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9

  // ✅ BỎ useEffect gây conflict
  // useEffect(() => {
  //   if (authState.isAuthenticated) {
  //     localStorage.setItem(STORAGE_KEYS.USER_ROLE, authState.userRole);
  //   } else {
  //     localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  //     localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
  //   }
  // }, [authState.isAuthenticated, authState.userRole]);
  const handleLogin = useCallback((role: UserRole) => {
<<<<<<< HEAD
    // Set token (dummy if not from backend), role, timestamp
=======
    // ✅ Set cả token, role và timestamp
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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

<<<<<<< HEAD
  // ProtectedRoute
  const ProtectedRoute = useCallback(({
    children,
    requiredRole
  }: {
    children: React.ReactNode;
=======
  // ✅ Simplified ProtectedRoute - BỎ location dependency
  const ProtectedRoute = useCallback(({ 
    children, 
    requiredRole 
  }: { 
    children: React.ReactNode; 
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
    requiredRole?: UserRole;
  }) => {
    if (!authState.isAuthenticated) {
      return <Navigate to={ROUTES.LOGIN} replace />;
    }
    if (requiredRole && authState.userRole !== requiredRole) {
      return <Navigate to={`/${authState.userRole}/dashboard`} replace />;
    }
    return <>{children}</>;
  }, [authState.isAuthenticated, authState.userRole]); // ✅ BỎ location

  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<Home isAuthenticated={authState.isAuthenticated} />} />
<<<<<<< HEAD
      <Route
        path={ROUTES.LOGIN}
        element={
          authState.isAuthenticated
            ? <Navigate to={`/${authState.userRole}/dashboard`} replace />
            : <Login onLogin={handleLogin} />
        }
      />
=======
      <Route path={ROUTES.LOGIN} element={authState.isAuthenticated ? <Navigate to={`/${authState.userRole}/dashboard`} replace /> : <Login onLogin={handleLogin} />} />
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9

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

<<<<<<< HEAD
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
=======
      {/* Manager Routes */}
      <Route path={`${ROUTES.MANAGER.DASHBOARD}/*`} element={<ProtectedRoute requiredRole="manager"><ManagerRouter onLogout={handleLogout} /></ProtectedRoute>} />
      
      {/* Nurse Routes */}
      <Route path={`${ROUTES.NURSE.DASHBOARD}/*`} element={<ProtectedRoute requiredRole="nurse"><NurseRouter onLogout={handleLogout} /></ProtectedRoute>} />
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9

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