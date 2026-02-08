import { Router } from "express";
import { authRequired } from "../middlewares/auth.js";

import {
  getImages,
  searchImages,
  getImageDetail,
  checkSaved,
  toggleSave,
  createImage,
  deleteImage,
} from "../controllers/image.controller.js";


import { getCommentsByImage, createComment } from "../controllers/comment.controller.js";

const r = Router();

// HOME + SEARCH
r.get("/", getImages);
r.get("/search", searchImages);

// DETAIL
r.get("/:hinh_id", getImageDetail);

// COMMENTS
r.get("/:hinh_id/comments", getCommentsByImage);
r.post("/:hinh_id/comments", authRequired, createComment);

// SAVE (JWT)
r.get("/:hinh_id/saved", authRequired, checkSaved);
r.post("/:hinh_id/save", authRequired, toggleSave);

// CREATE/DELETE image (JWT)
r.post("/", authRequired, createImage);
r.delete("/:hinh_id", authRequired, deleteImage);


export default r;
