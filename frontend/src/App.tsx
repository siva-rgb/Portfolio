import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AdminDashboardPage } from "./pages/AdminDashboard";
import { AdminLoginPage } from "./pages/AdminLogin";
import { PortfolioPage } from "./pages/Portfolio";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-center" toastOptions={{ className: "bg-ink-900 text-white border border-white/10" }} />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
