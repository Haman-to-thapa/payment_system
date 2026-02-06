import { type PaymentMethod } from "../types/payment";

interface Props {
  payment: PaymentMethod;
  onEdit?: () => void;
  onDelete: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

export default function PaymentCard({
  payment,
  onEdit,
  onDelete,
  onApprove,
  onReject,
}: Props) {
  const role = localStorage.getItem("role");

  const statusColor =
    payment.status === "APPROVED"
      ? "#2ECC71"
      : payment.status === "REJECTED"
        ? "#E74C3C"
        : "#F1C40F";

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <h4 style={{ marginTop: 0 }}>{payment.paymentType}</h4>

      {payment.bankName && <p>🏦 {payment.bankName}</p>}
      {payment.accountHolderName && <p>👤 {payment.accountHolderName}</p>}
      {payment.accountNumber && <p>🔢 {payment.accountNumber}</p>}
      {payment.ifscCode && <p>🏷️ {payment.ifscCode}</p>}

      {payment.upiId && <p>🔗 {payment.upiId}</p>}
      {payment.paytmNumber && <p>📱 {payment.paytmNumber}</p>}
      {payment.paypalEmail && <p>🌍 {payment.paypalEmail}</p>}
      {payment.usdtAddress && <p>🪙 {payment.usdtAddress}</p>}

      <p>
        <b>Status:</b>{" "}
        <span
          style={{
            padding: "4px 8px",
            borderRadius: 6,
            background: statusColor,
            color: "#fff",
            fontSize: 12,
          }}
        >
          {payment.status}
        </span>
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        {role === "user" && (
          <>
            {onEdit && (
              <button
                style={{
                  padding: "10px",
                  borderRadius: 8,
                  border: "none",
                  background: "#3F5EF8",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={onEdit}
              >
                Edit
              </button>
            )}

            <button
              style={{
                padding: "10px",
                borderRadius: 8,
                border: "none",
                background: "#E74C3C",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={onDelete}
            >
              Delete
            </button>
          </>
        )}

        {role === "admin" && (
          <>
            <button
              style={{
                padding: "10px",
                borderRadius: 8,
                border: "none",
                background: "#3F5EF8",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={onApprove}
              disabled={payment.status === "APPROVED"}
            >
              Approve
            </button>

            <button
              style={{
                padding: "10px",
                borderRadius: 8,
                border: "none",
                background: "#FF6A3D",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={onReject}
              disabled={payment.status === "REJECTED"}
            >
              Reject
            </button>

            <button
              style={{
                padding: "10px",
                borderRadius: 8,
                border: "none",
                background: "#E74C3C",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={onDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
