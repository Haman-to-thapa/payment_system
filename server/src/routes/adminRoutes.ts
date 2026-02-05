import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware";
import { deletePayment, getAllPayments, updatePaymentStatus } from "../controllers/adminController";
 

const router = express.Router();

router.get("/payments", protect, adminOnly, getAllPayments);
router.put("/payments/:id/status", protect, adminOnly, updatePaymentStatus);
router.delete("/payments/:id", protect, adminOnly, deletePayment);


export default router;
