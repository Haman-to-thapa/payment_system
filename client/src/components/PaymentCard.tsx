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
    <div className="card">
      <h4>{payment.paymentType}</h4>


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
              <button className="btn btn-primary" onClick={onEdit}>
                Edit
              </button>
            )}

            <button className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
          </>
        )}


        {role === "admin" && (
          <>
            <button
              className="btn btn-primary"
              onClick={onApprove}
              disabled={payment.status === "APPROVED"}
            >
              Approve
            </button>

            <button
              className="btn"
              style={{ background: "#FF6A3D", color: "#fff" }}
              onClick={onReject}
              disabled={payment.status === "REJECTED"}
            >
              Reject
            </button>

            <button className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
          </>
        )}
      </div>
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