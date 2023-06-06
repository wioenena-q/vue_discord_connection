import mongoose from "mongoose";

export const mongooseInit = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    authSource: "admin",
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
  });
};
