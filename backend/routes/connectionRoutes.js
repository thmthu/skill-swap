import { Router } from "express";
import {
	createConnection,
	getAllConnections,
	getAllReceivedConnections,
	getAllSentConnections,
	getRecentConnections,
	withdrawRequest,
	acceptRequest,
	rejectRequest,
	deleteConnection,
	deleteConnectionByUser,
} from "../controllers/connectionControllers.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";

export const router = Router();

router.get("/", authMiddleware, getAllConnections);
router.get("/received", authMiddleware, getAllReceivedConnections);
router.get("/sent", authMiddleware, getAllSentConnections);
router.get("/recent", authMiddleware, getRecentConnections);
router.post("/create/:receiverId", authMiddleware, createConnection);
router.delete("/withdraw/:connectionId", authMiddleware, withdrawRequest);
router.post("/accept/:connectionId", authMiddleware, acceptRequest);
router.post("/reject/:connectionId", authMiddleware, rejectRequest);
router.delete("/delete/:connectionId", authMiddleware, deleteConnection);
router.delete("/delete/user/:userId", authMiddleware, deleteConnectionByUser);

export default router;
