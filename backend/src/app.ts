import express, { Request, Response } from "express";
import connectDB from "./db/connect.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

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
