import express, { Request, Response } from "express";
import connectDB from "./database/connect.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import morgan from "morgan";
import cookiePrser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import dotenv from "dotenv";
import passport from "passport";
dotenv.config();

export const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookiePrser(process.env.JWT_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET
      ? process.env.COOKIE_SECRET
      : "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017",
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/keep-alive", (request: Request, response: Response) => {
  console.log("Keep-alive ping received!");
  response.status(200).send("I'm awake!");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL || "mongodb://localhost:27017");
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("❌ Error connecting to the database:", error);
    console.error(error);
  }
};

start();
