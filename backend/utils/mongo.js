import mongoose from "mongoose";
export const convertToObjectId = (origin) => {
  return new mongoose.Types.ObjectId(origin);
};