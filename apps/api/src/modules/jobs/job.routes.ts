import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { requireRole } from "../../middleware/require-role";
import {
  applyToJobController,
  listJobApplicationsController,
} from "../applications/application.controller";
import {
  createJobController,
  deleteJobController,
  getJobController,
  listJobsController,
  updateJobController,
} from "./job.controller";

const router = Router();

router.get("/", listJobsController);
router.post(
  "/:jobId/apply",
  authenticate,
  requireRole("USER"),
  applyToJobController,
);
router.get(
  "/:jobId/applications",
  authenticate,
  requireRole("ADMIN"),
  listJobApplicationsController,
);
router.get("/:id", getJobController);

router.post("/", authenticate, requireRole("ADMIN"), createJobController);
router.patch("/:id", authenticate, requireRole("ADMIN"), updateJobController);
router.delete("/:id", authenticate, requireRole("ADMIN"), deleteJobController);

export default router;
