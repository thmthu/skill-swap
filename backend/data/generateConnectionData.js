import mongoose from "mongoose";
import faker from "faker";
import dayjs from "dayjs";
import fs from 'fs/promises';
import path from 'path';
const { Schema } = mongoose;

const Connection = new Schema(
	{
		sender: { type: String, required: true },
		receiver: { type: String, required: true },
		status: { type: String, enum: ["pending", "accepted"], default: "pending" },
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const users = [
	"68136f4df5274319b87f5958",
	"681370f6f5274319b87f5975",
	"68138646b64aad82d5920f9a",
	"6813880e0fd0216d50f68baf",
	"681470f11ef387e882927627",
	"681471291ef387e882927630",
	"68147544526a4b6269e7e7de",
	"68148594c7ccf720a2c9df13",
	"6814e382ad5ac4759f9e7b7f",
	"6814fe1a032da46261c774c8",
	"6815ec894e92549cf028037b",
	"6815ec8ae81d3f050c413bd9",
	"6815f4c61eef7b0085b75bf4",
	"6817828835e3fe0a7c617fcf",
	"6817828835e3fe0a7c617fd0",
	"6817828835e3fe0a7c617fd1",
	"6817828835e3fe0a7c617fd2",
	"6817828835e3fe0a7c617fd3",
	"6817828835e3fe0a7c617fd4",
	"6817828835e3fe0a7c617fd5",
];

const connections = [];

users.slice(0, 20).forEach((user) => {
	// 5 isDeleted: true, status: pending, as sender
	for (let i = 0; i < 5; i++) {
		connections.push({
			sender: user,
			receiver: faker.random.arrayElement(users.filter((u) => u !== user)),
			status: "pending",
			isDeleted: true,
			createdAt: dayjs().subtract(2, "day").toDate(),
			updatedAt: dayjs().subtract(2, "day").toDate(),
		});
	}

	// 5 isDeleted: true, status: pending, as receiver
	for (let i = 0; i < 5; i++) {
		connections.push({
			sender: faker.random.arrayElement(users.filter((u) => u !== user)),
			receiver: user,
			status: "pending",
			isDeleted: true,
			createdAt: dayjs().subtract(2, "day").toDate(),
			updatedAt: dayjs().subtract(2, "day").toDate(),
		});
	}

	// 5 isDeleted: false, status: accepted, random sender/receiver
	for (let i = 0; i < 5; i++) {
		const isSender = faker.datatype.boolean();
		const partner = faker.random.arrayElement(users.filter((u) => u !== user));
		connections.push({
			sender: isSender ? user : partner,
			receiver: isSender ? partner : user,
			status: "accepted",
			isDeleted: false,
			createdAt: dayjs().subtract(2, "day").toDate(),
			updatedAt: dayjs().subtract(2, "day").toDate(),
		});
	}

	// 5 isDeleted: false, status: pending, as sender
	for (let i = 0; i < 5; i++) {
		connections.push({
			sender: user,
			receiver: faker.random.arrayElement(users.filter((u) => u !== user)),
			status: "pending",
			isDeleted: false,
			createdAt: dayjs().subtract(2, "day").toDate(),
			updatedAt: dayjs().subtract(2, "day").toDate(),
		});
	}

	// 5 isDeleted: false, status: pending, as receiver
	for (let i = 0; i < 5; i++) {
		connections.push({
			sender: faker.random.arrayElement(users.filter((u) => u !== user)),
			receiver: user,
			status: "pending",
			isDeleted: false,
			createdAt: dayjs().subtract(2, "day").toDate(),
			updatedAt: dayjs().subtract(2, "day").toDate(),
		});
	}
});

// Write connections to a JSON file
async function saveConnectionsToFile() {
  try {
    const outputPath = path.join('./', 'connections.json');
    await fs.writeFile(outputPath, JSON.stringify(connections, null, 2));
    console.log(`Successfully wrote ${connections.length} connections to ${outputPath}`);
  } catch (error) {
    console.error('Error writing connections to file:', error);
  }
}

// Execute the function
saveConnectionsToFile();
