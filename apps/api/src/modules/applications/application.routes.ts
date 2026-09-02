import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { requireRole } from "../../middleware/require-role";
import {
  listAllApplicationsController,
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
router.get(
  "/all",
  authenticate,
  requireRole("ADMIN"),
  listAllApplicationsController,
);
router.patch(
  "/:id/status",
  authenticate,
  requireRole("ADMIN"),
  updateApplicationStatusController,
);

export default router;
