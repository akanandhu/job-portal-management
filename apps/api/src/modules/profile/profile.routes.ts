import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { requireRole } from "../../middleware/require-role";
import { getProfileController, updateProfileController } from "./profile.controller";

const router = Router();

router.get("/", authenticate, requireRole("USER"), getProfileController);
router.put("/", authenticate, requireRole("USER"), updateProfileController);

export default router;
