import express from "express";
import { login } from "../controllers/authController.js";
import { verificarAdministrador, verificarToken, verificarInstrutor, verificarAluno } from "../utils/verificarToken.js";
const router = express.Router();
router.post("/login", login);

router.get("/verificartoken", verificarToken, (req, res) => {
    res.status(200).json({ message: "Você está autenticado." });
});

router.get("/verificaraluno/:id", verificarAluno, (req, res) => {
    res.status(200).json({ message: "O id passado é de um aluno." });
});

router.get("/verificarinstrutor/:id", verificarInstrutor, (req, res) => {
    res.status(200).json({ message: "O id passado é de um instrutor." });
});

router.get("/verificaradmin/:id", verificarAdministrador, (req, res) => {
    res.status(200).json({ message: "O id passado é de um administrador." });
});

export default router;