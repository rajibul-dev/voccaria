import express from "express";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// routes
app.use("/api/v1/auth");
app.use("/api/v1/users");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL || "mongodb://localhost:27017");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
