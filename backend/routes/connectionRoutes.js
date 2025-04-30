import { Router } from "express";
import {
	createConnection,
	respondConnection,
	getAllConnections,
	getAllReceivedConnections,
	getAllSentConnections,
	getRecentConnections,
} from "../controllers/connectionControllers.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";

export const router = Router();

router.post("/", authMiddleware, createConnection);
router.patch("/respond", authMiddleware, respondConnection);
router.get("/", authMiddleware, getAllConnections);
router.get("/received", authMiddleware, getAllReceivedConnections);
router.get("/sent", authMiddleware, getAllSentConnections);
router.get("/recent", authMiddleware, getRecentConnections);

export default router;
