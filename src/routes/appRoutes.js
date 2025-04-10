import express from "express";
import { createApp, deleteApp, getAllApps, getOneById, updatedApp } from "../controllers/appControllers.js";

const router = express.Router();

router.get("/", getAllApps)
router.get("/:id", getOneById)
router.post("/", createApp)
router.put("/:id", updatedApp)
router.delete("/:id", deleteApp)

export { router as appRouter}