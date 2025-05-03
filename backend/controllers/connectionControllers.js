import { get } from "mongoose";
import Connection from "../models/Connection.js";
import User from "../models/User.js";
import { getUserById } from "../utils/user.js";

export const getAllConnections = async (req, res) => {
	try {
		const user = await getUserById(req.userId);
		const connections = await Connection.find({
			$or: [{ sender: user._id }, { receiver: user._id }],
			isDeleted: false,
		})
			.populate("sender", "-password")
			.populate("receiver", "-password");
		if (!connections) {
			return res.status(404).json({ message: "No connections found" });
		}
		let result = await Promise.all(
			connections.map(async (connection) => {
				// Check if the user is the sender or receiver
				const otherUserId =
					connection.sender === user._id.toString()
						? connection.receiver
						: connection.sender;
				const friend = await User.findById(otherUserId).select("-password");
				if (!friend) {
					return null;
				}
				return friend;
			})
		);
		result = result.filter((item) => item !== null);
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
			isDeleted: false,
		}).populate("sender", "-password");

		if (!connections || connections.length === 0) {
			return res.status(404).json({ message: "No received connections found" });
		}

		const result = await Promise.all(
			connections.map(async (connection) => {
				let friend = await User.findById(connection.sender).select("-password");
				if (!friend) {
					console.log("Account is not exist");
					friend = { _id: "Default" };
				}
				const data = {
					_id: friend._id,
					connectionId: connection._id,
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
			isDeleted: false,
		}).populate("receiver", "-password");

		if (!connections || connections.length === 0) {
			return res.status(404).json({ message: "No sent connections found" });
		}

		const result = await Promise.all(
			connections.map(async (connection) => {
				let friend = await User.findById(connection.receiver).select(
					"-password"
				);
				if (!friend) {
					console.log("Account is not exist");
					friend = { _id: "Default" };
				}
				const data = {
					_id: friend._id,
					connectionId: connection._id,
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
			isDeleted: false,
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
					connectionId: connection._id,
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
		const { receiverId } = req.params;
		const user = await getUserById(req.userId);
		const senderId = user._id;
		// Check if the receiver send the request to the sender
		const oldConnection = await Connection.findOne({
			sender: receiverId,
			receiver: senderId,
		});
		if (oldConnection) {
			if (oldConnection.isDeleted) {
				oldConnection.isDeleted = false;
				await oldConnection.save();
				return res.status(200).json({
					message: "Connection request sent",
				});
			}
			// Need else condition to check if the connection is already accepted
		}
		// Check if the connection already exists
		const existingConnection = await Connection.findOne({
			sender: senderId,
			receiver: receiverId,
		});
		if (existingConnection && existingConnection.isDeleted) {
			existingConnection.isDeleted = false;
			await existingConnection.save();
		} else if (!existingConnection.isDeleted) {
			return res.status(200).json({
				message: "Connection already exists!",
			});
		} else {
			const connection = new Connection({
				sender: senderId,
				receiver: receiverId,
				status: "pending",
				isDeleted: false,
			});
			await connection.save();
		}
		return res.status(200).json({ message: "Connection request sent" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const withdrawRequest = async (req, res) => {
	try {
		const { connectionId } = req.params;

		const user = await getUserById(req.userId);
		// console.log(user);
		const connection = await Connection.findById(connectionId);
		if (!connection) {
			return res.status(404).json({ message: "Connection not found" });
		}
		if (connection.sender !== user._id.toString()) {
			return res.status(403).json({
				message: "You can only withdraw your own connections",
			});
		}
		connection.isDeleted = true;
		connection.status = "pending";
		connection.updatedAt = Date.now();
		await connection.save();
		return res.status(200).json({ message: "Connection withdrawn" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const acceptRequest = async (req, res) => {
	try {
		const { connectionId } = req.params;
		const user = await getUserById(req.userId);
		const connection = await Connection.findById(connectionId);
		if (!connection) {
			return res.status(404).json({ message: "Connection not found" });
		}
		if (connection.receiver.toString() !== user._id.toString()) {
			return res.status(403).json({
				message: "You can only accept your own connections",
			});
		}
		connection.status = "accepted";
		connection.updatedAt = Date.now();
		await connection.save();
		return res.status(200).json({ message: "Connection accepted" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const rejectRequest = async (req, res) => {
	try {
		const { connectionId } = req.params;
		const user = await getUserById(req.userId);
		const connection = await Connection.findById(connectionId);
		if (!connection) {
			return res.status(404).json({ message: "Connection not found" });
		}
		if (connection.receiver.toString() !== user._id.toString()) {
			return res.status(403).json({
				message: "You can only reject your own connections",
			});
		}
		connection.isDeleted = true;
		connection.updatedAt = Date.now();
		await connection.save();
		return res.status(200).json({ message: "Connection rejected" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const deleteConnection = async (req, res) => {
	try {
		const { connectionId } = req.params;
		const user = await getUserById(req.userId);
		const connection = await Connection.findById(connectionId);
		if (!connection) {
			return res.status(404).json({ message: "Connection not found" });
		}
		if (
			connection.sender !== user._id.toString() &&
			connection.receiver !== user._id.toString()
		) {
			return res.status(403).json({
				message: "You can only delete your own connections",
			});
		}
		connection.isDeleted = true;
		connection.updatedAt = Date.now();
		connection.status = "pending";
		await connection.save();
		return res.status(200).json({ message: "Connection deleted" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
