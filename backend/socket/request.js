import Connection from "../models/Connection.js";
import User from "../models/User.js";

const initConnectSocket = (io) => {
	io.on("connection", (socket) => {
		// User joins their own userId room to receive personal notifications
		socket.on("joinUser", (userId) => {
			console.log(`User ${userId} joined their notification room:`, socket.id);
			socket.join(userId);
		});

		// Handle sending a connect request
		socket.on("sendConnectRequest", async ({ senderId, receiverId }) => {
			try {
				const sender = await User.findById(senderId).select("-password");
				const connection = await Connection.findOne({
					sender: senderId,
					receiver: receiverId,
					isDeleted: true,
				});

				// Emit notification to receiver
				io.to(receiverId).emit("receiveConnectRequest", {
					connectionId: connection._id,
					senderId,
					senderName: sender.username || "Unknown",
					senderDepartment: sender.department || "Unknown Department",
					timestamp: connection.createdAt,
				});
			} catch (e) {
				console.error("Error at sendConnectRequest:", e);
				socket.emit("error", { message: "Failed to send connect request" });
			}
		});

		// Handle accepting a connect request
		socket.on("acceptConnectRequest", async ({ connectionId, userId }) => {
			try {
				// Find the connect request
				const connection = await Connection.findById(connectionId);
				const receiver = await User.findById(userId);
				// console.log(userId);
				// console.log(receiver);
				// console.log(connectionId);
				// console.log(connection);

				// Emit notification to sender
				io.to(connection.sender).emit("connectRequestAccepted", {
					connectionId: connection._id,
					receiverId: userId,
					receiverName: receiver.username || "Unknown",
					receiverDepartment: receiver.department || "Unknown Department",
					timestamp: connection.updatedAt,
				});
			} catch (e) {
				console.error("Error at acceptConnectRequest:", e);
				socket.emit("error", { message: "Failed to accept connect request" });
			}
		});

		socket.on("disconnect", () => {
			console.log("User disconnected from connect socket:", socket.id);
		});
	});
};

export default initConnectSocket;
