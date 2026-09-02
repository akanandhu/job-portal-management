import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { requireRole } from "../../middleware/require-role";
import {
  createJobController,
  deleteJobController,
  getJobController,
  listJobsController,
  updateJobController,
} from "./job.controller";

const router = Router();

router.get("/", listJobsController);
router.get("/:id", getJobController);

router.post("/", authenticate, requireRole("ADMIN"), createJobController);
router.patch("/:id", authenticate, requireRole("ADMIN"), updateJobController);
router.delete("/:id", authenticate, requireRole("ADMIN"), deleteJobController);

export default router;
