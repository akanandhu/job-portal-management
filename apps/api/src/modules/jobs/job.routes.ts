import { Router } from "express";
import { listJobsController } from "./job.controller";

const router = Router();

router.get("/", listJobsController);

export default router;
