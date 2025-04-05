import express from "express";
import { getAllUsers, getOneById } from "../controllers/usersControllers.js";

const router = express.Router();

router.get("/", getAllUsers)
router.get("/:id", getOneById)

export default router