export type PaymentType =
  | "BANK"
  | "PAYTM"
  | "UPI"
  | "PAYPAL"
  | "USDT";
export type PaymentStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface PaymentMethod {
  _id?: string;
   paymentType: "BANK" | "PAYTM" | "UPI" | "PAYPAL" | "USDT";
    status: PaymentStatus

  bankName?: string;
  ifscCode?: string;
  branchName?: string;
  accountNumber?: string;
  accountHolderName?: string;

  paytmNumber?: string;
  upiId?: string;
  paypalEmail?: string;
  usdtAddress?: string;

   user?: {
    username: string;
    email: string;
  };
}
