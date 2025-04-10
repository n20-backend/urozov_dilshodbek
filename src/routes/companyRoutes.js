import express from "express";
import { deleteCompany, getAllCompanys, getOneById, createCompany, updatedCompany } from "../controllers/companyControllers.js";

const router = express.Router();

router.get("/", getAllCompanys)
router.get("/:id", getOneById)
router.post("/", createCompany)
router.put("/:id", updatedCompany)
router.delete("/:id", deleteCompany)

export { router as companyRouter}