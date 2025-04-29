import Connection from "../models/Connection.js";
import { getUserByReq } from "../utils/user.js";

export const getAllConnections = async (req, res) => {
	try {
		const user = await getUserByReq(req);
		const connections = await Connection.find({
			receiver: user._id,
			status: "accepted",
		}).populate("sender", "-password");
		return res.status(200).json(connections);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getAllReceivedConnections = async (req, res) => {
	try {
		// const user = await getUserByReq(req);
		const user = "6805e59935e3fe0a7c60c037";
		console.log("userId", user);
		const connections = await Connection.find({
			receiver: user,
			status: "pending", // Filter for pending status
		}).populate("sender", "-password");
		return res.status(200).json(connections);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getAllSentConnections = async (req, res) => {
	try {
		const user = await getUserByReq(req);
		const connections = await Connection.find({
			sender: user._id,
			status: "pending", // Filter for pending status
		}).populate("receiver", "-password");
		return res.status(200).json(connections);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getRecentConnections = async (req, res) => {
	try {
		// const user = await getUserByReq(req);
		const user = req.userId; // Assuming you have the userId in the request

		// Calculate the date 7 days ago
		const oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

		// Find connections with updatedAt within the last week and status 'accepted'
		const connections = await Connection.find({
			// receiver: user._id,
			receiver: user,
			status: "accepted",
			// updatedAt: { $gte: oneWeekAgo }, // Filter for updatedAt within the last week
		}).populate("sender", "-password");

		return res.status(200).json(connections);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const createConnection = async (req, res) => {
	try {
		const { receiverId } = req.body;
		const user = await getUserByReq(req);
		const connection = await Connection.create({
			sender: user._id,
			receiver: receiverId,
		});
		return res.status(200).json({ message: "Connection created", connection });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const respondConnection = async (req, res) => {
	try {
		const { connectionId, action } = req.body;
		const user = await getUserByReq(req);
		const connection = await Connection.findById(connectionId);
		if (!connection) {
			return res.status(404).json({ message: "Connection not found" });
		}
		if (connection.receiverId.toString() !== user._id.toString()) {
			return res.status(403).json({
				message: `The receiver is different from the user who ${action} this connection`,
			});
		}
		connection.status = action;
		connection.updatedAt = Date.now();
		await connection.save();
		return res.status(200).json({ message: `Connection ${action}ed` });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export default { createConnection, respondConnection };
