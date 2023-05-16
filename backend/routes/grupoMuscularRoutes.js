import express from "express";
import { createGrupoMuscular, updateGrupoMuscular, deleteGrupoMuscular, getGrupoMuscular, getGruposMusculares } from
    "../controllers/grupoMuscularController.js";
import { verificarAdministrador, verificarAluno } from "../utils/security.js";

const router = express.Router();
router.post("/", verificarAdministrador, createGrupoMuscular);
router.put("/:id", verificarAdministrador, updateGrupoMuscular);
router.delete("/:id", verificarAdministrador, deleteGrupoMuscular);
router.get("/:id", verificarAluno, getGrupoMuscular);
router.get("/", verificarAluno, getGruposMusculares);

export default router;