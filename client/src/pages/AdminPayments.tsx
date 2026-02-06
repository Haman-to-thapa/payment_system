import { useEffect, useState, useCallback, useRef } from "react";
import api from "../api/api";
import { type PaymentMethod } from "../types/payment";
import Header from "../components/Header";
import PaymentCard from "../components/PaymentCard";

export default function AdminPayments() {
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    return <p style={{ textAlign: "center" }}>Access Denied</p>;
  }

  const [payments, setPayments] = useState<PaymentMethod[]>([]);
  const [paymentType, setPaymentType] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Ref for debounce timeout
  const searchTimeoutRef = useRef<any | null>(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);

    const params: Record<string, string> = {};

    // Only add paymentType if it's not empty
    if (paymentType && paymentType !== "") {
      params.paymentType = paymentType;
    }


    if (search && search.trim() !== "") {
      params.value = search.trim();
    }

    try {
      const res = await api.get("/admin/payments", { params });
      setPayments(res.data);
    } catch (error: any) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  }, [paymentType, search]);

  useEffect(() => {
    fetchPayments();
  }, []);


  useEffect(() => {
    fetchPayments();
  }, [paymentType, fetchPayments]);


  useEffect(() => {

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }


    if (search.trim() !== "") {
      searchTimeoutRef.current = setTimeout(() => {
        fetchPayments();
      }, 500);
    } else if (search === "") {

      fetchPayments();
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search, fetchPayments]);


  const handleApplyFilters = () => {
    fetchPayments();
  };

  return (
    <>
      <Header title="Admin – Payments" />

      <div style={{ maxWidth: 520, margin: "20px auto" }}>

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            border: "1px solid #ddd",
            borderRadius: 4
          }}
        >
          <option value="">All Payment Types</option>
          <option value="BANK">Bank</option>
          <option value="UPI">UPI</option>
          <option value="PAYTM">Paytm</option>
          <option value="PAYPAL">PayPal</option>
          <option value="USDT">USDT</option>
        </select>


        <input
          type="text"
          placeholder="Search (upi, bank, paytm...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              fetchPayments();
            }
          }}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            border: "1px solid #ddd",
            borderRadius: 4
          }}
        />


        <button
          type="button"
          onClick={handleApplyFilters}
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            background: loading ? "#ccc" : "#3F5EF8",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 20
          }}
        >
          {loading ? "Loading..." : "Apply Filters"}
        </button>


        {loading ? (
          <p style={{ textAlign: "center" }}>Loading payments...</p>
        ) : payments.length === 0 ? (
          <p style={{ textAlign: "center" }}>No payments found</p>
        ) : (
          payments.map((p) => (
            <PaymentCard
              key={p._id}
              payment={p}
              onDelete={async () => {
                if (!window.confirm("Delete payment?")) return;
                await api.delete(`/admin/payments/${p._id}`);
                fetchPayments();
              }}
              onApprove={async () => {
                await api.put(`/admin/payments/${p._id}/status`, {
                  status: "APPROVED",
                });
                fetchPayments();
              }}
              onReject={async () => {
                await api.put(`/admin/payments/${p._id}/status`, {
                  status: "REJECTED",
                });
                fetchPayments();
              }}
            />
          ))
        )}
      </div>
    </>
  );
}