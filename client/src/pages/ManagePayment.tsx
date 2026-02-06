import { useEffect, useState } from "react";
import api from "../api/api";
import { type PaymentMethod } from "../types/payment";
import PaymentCard from "../components/PaymentCard";
import PaymentForm from "../components/PaymentForm";
import Header from "../components/Header";

export default function ManagePayments() {
  const [payments, setPayments] = useState<PaymentMethod[]>([]);
  const [form, setForm] = useState<PaymentMethod>({
    paymentType: "BANK",
    status: "PENDING",
  });

  const [editingId, setEditingId] = useState<string | null>(null);


  const fetchPayments = async () => {
    const res = await api.get("/payments");
    setPayments(res.data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const savePayment = async () => {
    if (editingId) {
      await api.put(`/payments/${editingId}`, form);
    } else {
      await api.post("/payments", form);
    }

    setForm({
      paymentType: "BANK",
      status: "PENDING",
    });

    setEditingId(null);
    fetchPayments();
  };


  const deletePayment = async (id?: string) => {
    await api.delete(`/payments/${id}`);
    fetchPayments();
  };




  return (
    <div className="container">

      <Header title="Manage Payments" />

      <PaymentForm data={form} setData={setForm} onSubmit={savePayment} />

      {payments.map((p) => (
        <PaymentCard
          key={p._id}
          payment={p}
          onEdit={() => {
            setForm(p);
            setEditingId(p._id!);
          }}
          onDelete={() => deletePayment(p._id)}
        />

      ))}
    </div>
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