import express from "express";
import { createTipoExercicio, updateTipoExercicio, deleteTipoExercicio, getTipoExercicio, getTiposExercicios } from
    "../controllers/tipoExercicioController.js";
import { verificarAdministrador, verificarAluno } from "../utils/security.js";

const router = express.Router();
router.post("/", verificarAdministrador, createTipoExercicio);
router.put("/:id", verificarAdministrador, updateTipoExercicio);
router.delete("/:id", verificarAdministrador, deleteTipoExercicio);
router.get("/:id", verificarAluno, getTipoExercicio);
router.get("/", verificarAluno, getTiposExercicios);

export default router;