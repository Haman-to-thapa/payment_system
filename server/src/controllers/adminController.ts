import { Request, Response } from "express";
import PaymentMethod from "../model/PaymentMethod";


export const getAllPayments = async (req: Request, res: Response) => {
  const { paymentType, value } = req.query;
  
  let filter: any = {};
  
  
  if (paymentType && typeof paymentType === "string" && paymentType !== "") {
    filter.paymentType = paymentType;
  }
 
  else if (value && typeof value === "string" && value.trim() !== "") {
    const search = value.toLowerCase().trim();
    
    if (search === "upi") {
      filter.paymentType = "UPI";
    } 
    else if (search === "bank") {
      filter.paymentType = "BANK";
    }
    else if (search === "paytm") {
      filter.paymentType = "PAYTM";
    }
    else if (search === "paypal") {
      filter.paymentType = "PAYPAL";
    }
    else if (search === "usdt") {
      filter.paymentType = "USDT";
    }
  }
  
  try {
    const payments = await PaymentMethod.find(filter).sort({ createdAt: -1 });
    res.json(payments);
  } catch (error: any) {
    console.error("Error in getAllPayments:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message
    });
  }
};
export const updatePaymentStatus = async (req: Request, res: Response) => {
  const { status } = req.body;

  if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const updated = await PaymentMethod.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updated);
};


export const deletePayment = async (req: Request, res: Response) => {
  await PaymentMethod.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted by admin" });
};