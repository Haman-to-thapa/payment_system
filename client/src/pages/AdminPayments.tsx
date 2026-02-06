import { useEffect, useState } from "react";
import api from "../api/api";
import { type PaymentMethod } from "../types/payment";
import Header from "../components/Header";
import PaymentCard from "../components/PaymentCard";

export default function AdminPayments() {
  const [payments, setPayments] = useState<PaymentMethod[]>([]);
  const [paymentType, setPaymentType] = useState("");
  const [search, setSearch] = useState("");

  const fetchPayments = async () => {
    const res = await api.get("/admin/payments", {
      params: {
        paymentType,
        value: search,
      },
    });
    setPayments(res.data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const updateStatus = async (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    await api.put(`/admin/payments/${id}/status`, { status });
    fetchPayments();
  };

  const deletePayment = async (id: string) => {
    if (!window.confirm("Delete this payment?")) return;
    await api.delete(`/admin/payments/${id}`);
    fetchPayments();
  };

  /* INLINE STYLES */
  const containerStyle: React.CSSProperties = {
    maxWidth: "520px",
    margin: "20px auto",
    padding: "0 16px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#3F5EF8",
    color: "#fff",
    marginBottom: "12px",
  };

  return (
    <>
      <Header title="Admin – All Payments" />

      <div style={containerStyle}>
        {/* FILTERS */}
        <select
          style={inputStyle}
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="BANK">Bank</option>
          <option value="UPI">UPI</option>
          <option value="PAYTM">Paytm</option>
          <option value="PAYPAL">PayPal</option>
          <option value="USDT">USDT</option>
        </select>

        <input
          style={inputStyle}
          placeholder="Search by bank / UPI / email / IFSC..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button style={buttonStyle} onClick={fetchPayments}>
          Apply Filters
        </button>

        {/* LIST */}
        {payments.length === 0 && <p>No payments found</p>}

        {payments.map((p) => (
          <PaymentCard
            key={p._id}
            payment={p}
            onApprove={() => updateStatus(p._id!, "APPROVED")}
            onReject={() => updateStatus(p._id!, "REJECTED")}
            onDelete={() => deletePayment(p._id!)}
          />
        ))}
      </div>
    </>
  );
}
