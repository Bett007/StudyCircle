import express from "express";
import {
  createSOS,
  claimSOS,
  sendMessage,
  resolveSOS,
  getAllSOS
} from "../controllers/sosController.js";

const router = express.Router();

router.get("/", getAllSOS);
router.post("/", createSOS);
router.post("/:id/claim", claimSOS);
router.post("/:id/message", sendMessage);
router.post("/:id/resolve", resolveSOS);

export default router;
