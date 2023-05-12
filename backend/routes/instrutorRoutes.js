import express from "express";
import { createInstrutor, updateInstrutor, deleteInstrutor, getInstrutor, getInstrutores } from
    "../controllers/instrutorController.js";
import { verificarAdministrador } from "../utils/verificarToken.js";

const router = express.Router();
router.post("/", verificarAdministrador, createInstrutor);
router.put("/:id", verificarAdministrador, updateInstrutor);
router.delete("/:id", verificarAdministrador, deleteInstrutor);
router.get("/:id", verificarAdministrador, getInstrutor);
router.get("/", verificarAdministrador, getInstrutores);

export default router;