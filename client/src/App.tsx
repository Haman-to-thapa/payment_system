import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagePayments from "./pages/ManagePayment";
import AdminPayments from "./pages/AdminPayments";


export default function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <ManagePayments />
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminPayments />
          </ProtectedRoute>
        }
      />


      <Route path="/" element={<Navigate to="/payments" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
