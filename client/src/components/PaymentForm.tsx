import { type PaymentMethod, type PaymentType } from "../types/payment";

interface Props {
  data: PaymentMethod;
  setData: (d: PaymentMethod) => void;
  onSubmit: () => void;
}

export default function PaymentForm({ data, setData, onSubmit }: Props) {
  return (
    <div className="card">
      <select
        className="input"
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
            className="input"
            placeholder="Bank Name"
            value={data.bankName || ""}
            onChange={(e) =>
              setData({ ...data, bankName: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Branch Name"
            value={data.branchName || ""}
            onChange={(e) =>
              setData({ ...data, branchName: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Account Holder Name"
            value={data.accountHolderName || ""}
            onChange={(e) =>
              setData({ ...data, accountHolderName: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Account Number"
            value={data.accountNumber || ""}
            onChange={(e) =>
              setData({ ...data, accountNumber: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="IFSC Code"
            value={data.ifscCode || ""}
            onChange={(e) =>
              setData({ ...data, ifscCode: e.target.value })
            }
          />
        </>
      )}


      {data.paymentType === "UPI" && (
        <input className="input" placeholder="UPI ID"
          onChange={(e) => setData({ ...data, upiId: e.target.value })} />
      )}

      {data.paymentType === "PAYTM" && (
        <input className="input" placeholder="Paytm Number"
          onChange={(e) => setData({ ...data, paytmNumber: e.target.value })} />
      )}

      {data.paymentType === "PAYPAL" && (
        <input className="input" placeholder="PayPal Email"
          onChange={(e) => setData({ ...data, paypalEmail: e.target.value })} />
      )}

      {data.paymentType === "USDT" && (
        <input className="input" placeholder="USDT Address"
          onChange={(e) => setData({ ...data, usdtAddress: e.target.value })} />
      )}

      <button className="btn btn-primary" onClick={onSubmit}>
        {data._id ? "Update Payment" : "Save Payment"}
      </button>

    </div>
  );
}
