import Connection from "../models/Connection.js";
import User from "../models/User.js";
import { getUserByReq, getUserById } from "../utils/user.js";

export const getAllConnections = async (req, res) => {
	try {
		const user = await getUserById(req.userId);
		const connections = await Connection.find({
			$or: [{ sender: user._id }, { receiver: user._id }],
		})
			.populate("sender", "-password")
			.populate("receiver", "-password");
		if (!connections) {
			return res.status(404).json({ message: "No connections found" });
		}
		const result = await Promise.all(
			connections.map(async (connection) => {
				// Check if the user is the sender or receiver
				const otherUserId =
					connection.sender === user._id.toString()
						? connection.receiver
						: connection.sender;
				const friend = await User.findById(otherUserId).select("-password");
				const data = {
					_id: friend._id,
					username: friend.username,
					department: friend.department || "Unknown Department",
					timestamp: connection.updatedAt,
				};
				return data;
			})
		);
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getAllReceivedConnections = async (req, res) => {
	try {
		const user = await getUserById(req.userId);
		const connections = await Connection.find({
			receiver: user._id,
			status: "pending",
		}).populate("sender", "-password");

		if (!connections || connections.length === 0) {
			return res.status(404).json({ message: "No received connections found" });
		}

		const result = await Promise.all(
			connections.map(async (connection) => {
				const friend = await User.findById(connection.sender).select(
					"-password"
				);
				const data = {
					_id: friend._id,
					username: friend.username,
					department: friend.department || "Unknown Department",
					timestamp: connection.updatedAt,
				};
				return data;
			})
		);

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getAllSentConnections = async (req, res) => {
	try {
		const user = await getUserById(req.userId);
		const connections = await Connection.find({
			sender: user._id,
			status: "pending",
		}).populate("receiver", "-password");

		if (!connections || connections.length === 0) {
			return res.status(404).json({ message: "No sent connections found" });
		}

		const result = await Promise.all(
			connections.map(async (connection) => {
				const friend = await User.findById(connection.receiver).select(
					"-password"
				);
				const data = {
					_id: friend._id,
					username: friend.username,
					department: friend.department || "Unknown Department",
					timestamp: connection.updatedAt,
				};
				return data;
			})
		);

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getRecentConnections = async (req, res) => {
	try {
		const user = await getUserById(req.userId);

		// Calculate the date 7 days ago
		const oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

		const connections = await Connection.find({
			$or: [{ sender: user._id }, { receiver: user._id }],
			status: "accepted",
			// updatedAt: { $gte: oneWeekAgo },
		})
			.populate("sender", "-password")
			.populate("receiver", "-password");

		if (!connections || connections.length === 0) {
			return res.status(404).json({ message: "No recent connections found" });
		}

		const result = await Promise.all(
			connections.map(async (connection) => {
				const otherUserId =
					connection.sender.toString() === user._id.toString()
						? connection.receiver
						: connection.sender;
				const friend = await User.findById(otherUserId).select("-password");
				const data = {
					_id: friend._id,
					username: friend.username,
					department: friend.department || "Unknown Department",
					timestamp: connection.updatedAt,
				};
				return data;
			})
		);

		return res.status(200).json(result);
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
		const receiver = await getUserById(connection.receiver);
		const sender = await getUserById(connection.sender);
		if (action === "accept") {
			receiver.connections.push(sender._id);
			sender.connections.push(receiver._id);
			await receiver.save();
			await sender.save();
		}
		await connection.save();
		return res.status(200).json({ message: `Connection ${action}ed` });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export default { createConnection, respondConnection };
