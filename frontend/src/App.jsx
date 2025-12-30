import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserDashboard from "./pages/user/UserDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import Navbar from "./components/layout/Navbar";

import api from "./services/api";
import { useAuthStore } from "./store/authStore";

function AppLayout() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // even if logout fails, clear client state
    } finally {
      clearUser();
      navigate("/login");
    }
  };

  return (
    <>
      {/* Toast notifications */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      {/* Navbar (only if logged in) */}
      {user && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User dashboard */}
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* Admin users page */}
        <Route path="/admin/users" element={<AdminUsers />} />

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
