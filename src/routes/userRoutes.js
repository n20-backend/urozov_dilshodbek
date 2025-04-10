import express from "express";
import { getAllUsers, getOneById, createUser, deleteUser, updatedUser } from "../controllers/usersControllers.js";

const router = express.Router();

router.get("/", getAllUsers)
router.get("/:id", getOneById)
router.post("/", createUser)
router.put("/:id", updatedUser)
router.delete("/:id", deleteUser)

export { router as userRouter}