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
