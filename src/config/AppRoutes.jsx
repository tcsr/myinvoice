import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import GenerateInvoice from "../pages/GenerateInvoice";
import ViewInvoice from "../pages/ViewInvoice";
import SearchInvoice from "../pages/SearchInvoice";
import UploadInvoice from "../pages/uploadInvoice/UploadInvoice";
import MyProfile from "../pages/MyProfile";
import ChangePassword from "../components/user/ChangePassword";
import ProtectedRoute from "../components/prtotected/ProtectedRoute";
import InvoiceDetails from "../pages/InvoiceDetails";
import { useKeycloak } from "../context/KeycloakProvider";

const AppRoutes = () => {

  const navigate = useNavigate();
  const { keycloakInitialized } = useKeycloak();
  const [redirectHandled, setRedirectHandled] = useState(false);

  useEffect(() => {
    if (keycloakInitialized && !redirectHandled) {
      const freshLogin = localStorage.getItem('freshLogin');
      if (freshLogin === 'true') {
        navigate('/dashboard', { replace: true });
        localStorage.removeItem('freshLogin'); // Reset fresh login flag after redirection
        setRedirectHandled(true);
      }
    }
  }, [keycloakInitialized, redirectHandled, navigate]);


  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/generate" element={<ProtectedRoute><GenerateInvoice /></ProtectedRoute>} />
      <Route path="/view-invoice" element={<ProtectedRoute><ViewInvoice /></ProtectedRoute>} />
      <Route path="/search-invoice" element={<ProtectedRoute><SearchInvoice /></ProtectedRoute>} />
      <Route path="/upload-invoice" element={<ProtectedRoute><UploadInvoice /></ProtectedRoute>} />
      <Route path="/invoice-details/:id" element={<ProtectedRoute><InvoiceDetails /></ProtectedRoute>} />
      <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
