import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import imageRoutes from "./routes/image.routes.js";
import userRoutes from "./routes/user.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ message: "OK" }));

app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/users", userRoutes);
