import express from "express";
import { getAllUsers, getOneById, createUser, updateUser } from "../controllers/usersControllers.js";

const router = express.Router();

router.get("/", getAllUsers)
router.get("/:id", getOneById)
router.post("/", createUser)
router.put("/:id", updateUser)

export default router