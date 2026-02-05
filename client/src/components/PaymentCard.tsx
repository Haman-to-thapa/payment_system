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
