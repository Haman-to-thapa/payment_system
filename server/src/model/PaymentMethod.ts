import mongoose, {Document} from "mongoose";

export interface IPaymentMethod extends Document {
  user: mongoose.Types.ObjectId;
  paymentType: "BANK" | "PAYTM" | "UPI" | "PAYPAL" | "USDT";
  status: "PENDING" | "APPROVED" | "REJECTED";
  ifscCode?: string;
  branchName?: string;
  bankName?: string;
  accountNumber?: string;
  accountHolderName?: string;

  paytmNumber?: string;
  upiId?: string;
  paypalEmail?: string;
  usdtAddress?: string;
}

const paymentMethodSchema = new mongoose.Schema<IPaymentMethod>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    paymentType: {
      type: String,
      enum: ["BANK", "PAYTM", "UPI", "PAYPAL", "USDT"],
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },

 
    ifscCode: String,
    branchName: String,
    bankName: String,
    accountNumber: String,
    accountHolderName: String,

 
    paytmNumber: String,


    upiId: String,

    paypalEmail: String,

    usdtAddress: String,
  },
  { timestamps: true }
);


export default mongoose.model<IPaymentMethod>(
  "PaymentMethod",
  paymentMethodSchema
);