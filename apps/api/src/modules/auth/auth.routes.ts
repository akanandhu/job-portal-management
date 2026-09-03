import { Router } from "express";
import {
  loginController,
  logoutController,
  refreshAccessTokenController,
  registerController,
} from "./auth.controller";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/refresh", refreshAccessTokenController);
router.post("/logout", logoutController);

export default router;
