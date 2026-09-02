import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes"
import jobRoutes from "./modules/jobs/job.routes";
import cookieParser from "cookie-parser";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
