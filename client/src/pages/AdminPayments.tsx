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
