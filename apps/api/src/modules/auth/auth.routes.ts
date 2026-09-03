import { Router } from "express";
import { loginController, logoutController, refreshAccessTokenController } from "./auth.controller";

const router = Router();

router.post("/login", loginController);
router.post("/refresh", refreshAccessTokenController);
router.post("/logout", logoutController);

export default router;
