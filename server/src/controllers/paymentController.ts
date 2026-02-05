import { Request, Response } from "express";
import PaymentMethod from "../model/PaymentMethod";

export const addPayment = async (req:Request, res:Response) => {
  const payment = await PaymentMethod.create({
    ...req.body,
    user:req.user?.id,
       status: "PENDING",
  });

  res.json(payment)
}


export const getMyPayment = async (req:Request, res:Response) => {
  const payments = await PaymentMethod.find({user:req.user?.id});
  res.json(payments);
}


export const updatePayment = async (req:Request, res:Response) => {

    const { status, ...safeData } = req.body;

  const updated = await PaymentMethod.findByIdAndUpdate(
    req.params.id,
    safeData,
    {new:true}
  )
  res.json(updated)
}



export const deletePayment = async (req: Request, res: Response) => {
  await PaymentMethod.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};