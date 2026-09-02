import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { requireRole } from "../../middleware/require-role";
import {
  listMyApplicationsController,
  updateApplicationStatusController,
} from "./application.controller";

const router = Router();

router.get(
  "/me",
  authenticate,
  requireRole("USER"),
  listMyApplicationsController,
);
router.patch(
  "/:id/status",
  authenticate,
  requireRole("ADMIN"),
  updateApplicationStatusController,
);

export default router;
