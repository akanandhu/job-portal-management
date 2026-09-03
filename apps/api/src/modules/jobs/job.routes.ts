import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { optionalAuthenticate } from "../../middleware/optional-authenticate";
import { requireRole } from "../../middleware/require-role";
import {
  applyToJobController,
  listJobApplicationsController,
} from "../applications/application.controller";
import {
  createJobController,
  deleteJobController,
  getJobController,
  listFeaturedJobsController,
  listJobCategoriesController,
  listJobsController,
  updateJobController,
} from "./job.controller";

const router = Router();

router.get("/", optionalAuthenticate, listJobsController);
router.get("/featured", listFeaturedJobsController);
router.get("/categories", listJobCategoriesController);
router.post("/:jobId/apply", authenticate, requireRole("USER"), applyToJobController);
router.get(
  "/:jobId/applications",
  authenticate,
  requireRole("ADMIN"),
  listJobApplicationsController,
);
router.get("/:id", optionalAuthenticate, getJobController);

router.post("/", authenticate, requireRole("ADMIN"), createJobController);
router.patch("/:id", authenticate, requireRole("ADMIN"), updateJobController);
router.delete("/:id", authenticate, requireRole("ADMIN"), deleteJobController);

export default router;
