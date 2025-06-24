import express, { Request, Response } from "express";
import connectDB from "./database/connect.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";

import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import dotenv from "dotenv";
import passport from "passport";
import "./libs/passport/localStrategy.js";
import "./libs/passport/googleStrategy.js";
import "./libs/passport/discordStrategy.js";
import "./libs/cloudinary.js";
import fileUpload from "express-fileupload";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authorizeUser } from "./middlewares/authorizeUserMiddleware.js";
dotenv.config();

export const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://voccaria.com",
  "https://dev.voccaria.com",
  undefined, // Allow requests with no origin (like mobile apps or curl requests)
];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      console.error(msg);
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.set("trust proxy", 1);
app.use(cors(corsOptions));

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(morgan("dev"));
app.use(cookieParser(process.env.JWT_SECRET));

console.log("Cookie Settings:", {
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
});
app.use(
  session({
    secret: process.env.COOKIE_SECRET
      ? process.env.COOKIE_SECRET
      : "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      ...(process.env.NODE_ENV === "production" && {
        domain: "voccaria.com",
      }),
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
app.use("/api/v1/schedule", scheduleRoutes);

app.get("/keep-alive", (request: Request, response: Response) => {
  console.log("Keep-alive ping received!");
  response.status(200).send("I'm awake!");
});

app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL || "mongodb://localhost:27017");
    app.listen(PORT as number, "0.0.0.0", () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("❌ Error connecting to the database:", error);
    console.error(error);
  }
};

start();
