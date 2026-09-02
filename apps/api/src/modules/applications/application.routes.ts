import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { requireRole } from "../../middleware/require-role";
import { listMyApplicationsController } from "./application.controller";

const router = Router();

router.get(
  "/me",
  authenticate,
  requireRole("USER"),
  listMyApplicationsController,
);

export default router;
