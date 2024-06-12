import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import GenerateInvoice from "../pages/GenerateInvoice";
import Viewinvoice from "../pages/ViewInvoice";
import Searchinvoice from "../pages/SearchInvoice";
import UploadInvoice from "../pages/uploadInvoice/UploadInvoice";
import MyProfile from "../pages/MyProfile";
import ChangePassword from "../components/user/ChangePassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/generate" element={<GenerateInvoice />} />
      <Route path="/view-invoice" element={<Viewinvoice />} />
      <Route path="/search-invoice" element={<Searchinvoice />} />
      <Route path="/upload-invoice" element={<UploadInvoice />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/change-password" element={<ChangePassword />} />
      {/* Redirect to Dashboard for unmatched paths */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
