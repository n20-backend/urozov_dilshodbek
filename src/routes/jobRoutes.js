import express from "express";
import { createJobs, deleteJob, getAllJob, getOneById, updatedJob } from "../controllers/jobControllers.js";

const router = express.Router();

router.get("/", getAllJob)
router.get("/:id", getOneById)
router.post("/", createJobs)
router.put("/:id", updatedJob)
router.delete("/:id", deleteJob)

export { router as jobRouter }