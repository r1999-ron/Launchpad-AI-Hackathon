import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import CosmicBackground from './components/CosmicBackground';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import FileUpload from './pages/FileUpload';
import ApplyLeaves from './pages/leaves/ApplyLeaves';
import ApproveLeaves from './pages/leaves/ApproveLeaves';
import './styles/global.css';
import './styles/cosmic-background.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

// Public route - redirects to dashboard if already logged in
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Content selector based on user role
const DashboardSelector = () => {
  const { currentUser } = useAuth();

  // Check if user is admin
  if (currentUser && currentUser.email === 'admin@payoda.com') {
    return <AdminDashboard />;
  }

  // Otherwise show regular dashboard
  return <Dashboard />;
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <CosmicBackground />
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardSelector />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <FileUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-leaves"
            element={
              <ProtectedRoute>
                <ApplyLeaves />
              </ProtectedRoute>
            }
          />
          <Route
            path="/approve-leaves"
            element={
              <ProtectedRoute>
                <ApproveLeaves />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
