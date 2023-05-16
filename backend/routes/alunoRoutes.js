import express from "express";
import { createAluno, updateAluno, deleteAluno, getAluno, getAlunos } from
    "../controllers/alunoController.js";
import { verificarAdministrador, verificarAluno, verificarInstrutor } from "../utils/security.js";

const router = express.Router();
router.post("/", verificarAdministrador, createAluno);
router.put("/:id", verificarAdministrador, updateAluno);
router.delete("/:id", verificarAdministrador, deleteAluno);
router.get("/:id", verificarAluno, getAluno);
router.get("/", verificarInstrutor, getAlunos);

export default router;