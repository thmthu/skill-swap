import { Schema, model } from "mongoose";

var Connection = new Schema(
	{
		sender: { type: String, required: true },
		receiver: { type: String, required: true },
		status: {
			type: String,
			enum: ["pending", "accepted", "rejected"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

var Connection = model("Connection", Connection);
export default Connection;
