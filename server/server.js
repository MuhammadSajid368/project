import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
// import & pass in route middleware
import authRoute from "./routes/authRoute.js";
import { DATABASE_CLOUD, DATABASE_LOCAL } from "./config/config.js";
import { Routes} from "./routes/Course.js";
import { userRouter } from "./routes/user.js";
import { leaveRoute } from "./routes/leave.js";
import eventRouter from "./routes/events.js";
import quizRoute from "./routes/quiz.js";
import paymentRoutes from "./routes/payment.js";
const app = express();
const port = 8080;
import cookieParser from 'cookie-parser'
import router from "./routes/attendence.js";
// DB connection
mongoose
  .connect(DATABASE_CLOUD)
  .then((con) => console.log(`DB conneted with ${con.connection.host}`))
  .catch((err) => console.log(`connection failed ..${err.message}`));

// apply middlwares
app.use(express.json());
app.use(morgan("dev"));
// Serve static files from the "uploads" directory
app.use(express.static("uploads"));
app.use(morgan("tiny"));
app.use(cors());
app.use(cookieParser());
app.use("/api/v1", authRoute);
app.use("/api/v1", Routes);
app.use("/api/v1", userRouter);
app.use("/api/v1", leaveRoute);
app.use("/api/v1", eventRouter);
app.use("/api/v1", quizRoute);
app.use("/api", paymentRoutes);
app.use("/attendence" , router)
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
