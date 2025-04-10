import express from "express";
import { createReview, deleteReview, getAllReviews, getOneById, updateReview } from "../controllers/reviewControllers.js";

const router = express.Router();

router.get("/", getAllReviews)
router.get("/:id", getOneById)
router.post("/", createReview)
router.put("/:id", updateReview)
router.delete("/:id", deleteReview)

export { router as reviewRouter}