import { Request, Response } from "express";
import PaymentMethod from "../model/PaymentMethod";


export const getAllPayments = async (req: Request, res: Response) => {
  const payments = await PaymentMethod.find()
    .populate("user", "username email")
    .sort({ createdAt: -1 });

  res.json(payments);
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