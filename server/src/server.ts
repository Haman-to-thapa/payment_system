import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes"
import paymentRoutes from './routes/paymentRoutes'
import adminRoutes from './routes/adminRoutes'

dotenv.config({
  path: path.join(__dirname, "../src/.env"),
});
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
