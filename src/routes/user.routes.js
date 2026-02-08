import { Router } from "express";
import { authRequired } from "../middlewares/auth.js";
import { getMe, updateMe, getMySavedImages, getMyCreatedImages } from "../controllers/user.controller.js";

const r = Router();

r.get("/me", authRequired, getMe);
r.put("/me", authRequired, updateMe);
r.get("/me/saved-images", authRequired, getMySavedImages);
r.get("/me/created-images", authRequired, getMyCreatedImages);

export default r;
