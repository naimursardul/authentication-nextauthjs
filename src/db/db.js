import mongoose from "mongoose";

const connection = {};

export const connectDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("db error: " + error);
    throw new Error("Problem in connection!");
  }
};
