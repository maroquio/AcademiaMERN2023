import express from "express";
import { createInstrutor, updateInstrutor, deleteInstrutor, getInstrutor, getInstrutores } from
    "../controllers/instrutorController.js";
import { verificarAdmin, verificarUsuario } from "../utils/verificarToken.js";

const router = express.Router();
router.post("/", verificarAdmin, createInstrutor);
router.put("/:id", verificarUsuario, updateInstrutor);
router.delete("/:id", verificarAdmin, deleteInstrutor);
router.get("/:id", verificarUsuario, getInstrutor);
router.get("/", verificarAdmin, getInstrutores);

export default router;