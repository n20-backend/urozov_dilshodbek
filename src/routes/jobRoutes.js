import express from "express";
import { getAllUsers, getOneById } from "../controllers/jobsControllers";

const router = express.Router();

router.get("/", getAllUsers)
router.get("/:id", getOneById)

export default router