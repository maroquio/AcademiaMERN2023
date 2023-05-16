import express from "express";
import { getUsuario, getUsuarios, updateUsuario } from "../controllers/usuarioController.js";
import { verificarAluno, verificarInstrutor } from "../utils/security.js";

const router = express.Router();
router.put("/:id", verificarAluno, updateUsuario);
router.get("/:id", verificarAluno, getUsuario);
router.get("/", verificarInstrutor, getUsuarios);

export default router;