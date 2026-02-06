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

  return (
    <>
      <Header title="Admin – All Payments" />

      <div className="container">
        {/* FILTERS */}
        <select
          className="input"
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
          className="input"
          placeholder="Search by bank / UPI / email / IFSC..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn btn-primary" onClick={fetchPayments}>
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


const styles = {
  body: {
    margin: 0,
    fontFamily: "system-ui, sans-serif",
    background: "#f4f6fb",
    minHeight: "100vh",
    padding: "16px",
  },
  container: {
    maxWidth: "420px",
    margin: "40px auto",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  btn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#3f5ef8",
    color: "#fff",
    marginTop: "8px",
  },
};