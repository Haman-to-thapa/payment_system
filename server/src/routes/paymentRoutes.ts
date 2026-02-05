import express from "express";
import {
  addPayment,
  updatePayment,
  deletePayment,
  getMyPayment,
} from "../controllers/paymentController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, addPayment);
router.get("/", protect,getMyPayment);
router.put("/:id", protect, updatePayment);
router.delete("/:id", protect, deletePayment);

export default router;
