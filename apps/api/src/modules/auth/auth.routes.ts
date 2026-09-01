import { Router } from "express";
import { loginController, refreshAccessTokenController } from "./auth.controller";

const router = Router();

router.post("/login", loginController);
router.post("/refresh", refreshAccessTokenController);

export default router;