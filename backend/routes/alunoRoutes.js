import express from "express";
import { createAluno, updateAluno, deleteAluno, getAluno, getAlunos } from
    "../controllers/AlunoController.js";
import { verificarAdmin, verificarUsuario } from "../utils/verificarToken.js";

const router = express.Router();
router.post("/", verificarAdmin, createAluno);
router.put("/:id", verificarUsuario, updateAluno);
router.delete("/:id", verificarAdmin, deleteAluno);
router.get("/:id", verificarUsuario, getAluno);
router.get("/", verificarAdmin, getAlunos);

export default router;