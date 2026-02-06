import { type PaymentMethod, type PaymentType } from "../types/payment";

interface Props {
  data: PaymentMethod;
  setData: (d: PaymentMethod) => void;
  onSubmit: () => void;
}

export default function PaymentForm({ data, setData, onSubmit }: Props) {
  const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 14,
    padding: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
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
    marginTop: "8px",
  };

  return (
    <div style={cardStyle}>
      <select
        style={inputStyle}
        value={data.paymentType}
        onChange={(e) =>
          setData({
            ...data,
            paymentType: e.target.value as PaymentType,
          })
        }
      >
        <option value="">Select Payment Type</option>
        <option value="BANK">Bank</option>
        <option value="UPI">UPI</option>
        <option value="PAYTM">Paytm</option>
        <option value="PAYPAL">PayPal</option>
        <option value="USDT">USDT</option>
      </select>

      {data.paymentType === "BANK" && (
        <>
          <input
            style={inputStyle}
            placeholder="Bank Name"
            value={data.bankName || ""}
            onChange={(e) =>
              setData({ ...data, bankName: e.target.value })
            }
          />

          <input
            style={inputStyle}
            placeholder="Branch Name"
            value={data.branchName || ""}
            onChange={(e) =>
              setData({ ...data, branchName: e.target.value })
            }
          />

          <input
            style={inputStyle}
            placeholder="Account Holder Name"
            value={data.accountHolderName || ""}
            onChange={(e) =>
              setData({ ...data, accountHolderName: e.target.value })
            }
          />

          <input
            style={inputStyle}
            placeholder="Account Number"
            value={data.accountNumber || ""}
            onChange={(e) =>
              setData({ ...data, accountNumber: e.target.value })
            }
          />

          <input
            style={inputStyle}
            placeholder="IFSC Code"
            value={data.ifscCode || ""}
            onChange={(e) =>
              setData({ ...data, ifscCode: e.target.value })
            }
          />
        </>
      )}

      {data.paymentType === "UPI" && (
        <input
          style={inputStyle}
          placeholder="UPI ID"
          onChange={(e) =>
            setData({ ...data, upiId: e.target.value })
          }
        />
      )}

      {data.paymentType === "PAYTM" && (
        <input
          style={inputStyle}
          placeholder="Paytm Number"
          onChange={(e) =>
            setData({ ...data, paytmNumber: e.target.value })
          }
        />
      )}

      {data.paymentType === "PAYPAL" && (
        <input
          style={inputStyle}
          placeholder="PayPal Email"
          onChange={(e) =>
            setData({ ...data, paypalEmail: e.target.value })
          }
        />
      )}

      {data.paymentType === "USDT" && (
        <input
          style={inputStyle}
          placeholder="USDT Address"
          onChange={(e) =>
            setData({ ...data, usdtAddress: e.target.value })
          }
        />
      )}

      <button style={buttonStyle} onClick={onSubmit}>
        {data._id ? "Update Payment" : "Save Payment"}
      </button>
    </div>
  );
}
