
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Public pages
import Home from "./pages/public/Home";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/auth/Login";
import Register from "./pages/admin/auth/Register";
import ForgotPassword from "./pages/admin/auth/ForgotPassword";
import Users from "./pages/admin/Users";
import Content from "./pages/admin/Content";
import Messages from "./pages/admin/Messages";
import Settings from "./pages/admin/Settings";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/register" element={<Register />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
            
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="content" element={<Content />} />
              <Route path="messages" element={<Messages />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
