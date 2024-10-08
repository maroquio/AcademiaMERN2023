import express from "express";
import { login, alterarSenha } from "../controllers/authController.js";
import { verificarAutenticado } from "../utils/security.js";
const router = express.Router();
router.post("/login", login);
router.post("/alterarsenha", verificarAutenticado, alterarSenha);

// router.get("/security", verificarToken, (req, res) => {
//     res.status(200).json({ message: "Você está autenticado." });
// });

// router.get("/verificaraluno/:id", verificarAluno, (req, res) => {
//     res.status(200).json({ message: "O id passado é de um aluno." });
// });

// router.get("/verificarinstrutor/:id", verificarInstrutor, (req, res) => {
//     res.status(200).json({ message: "O id passado é de um instrutor." });
// });

// router.get("/verificaradmin/:id", verificarAdministrador, (req, res) => {
//     res.status(200).json({ message: "O id passado é de um administrador." });
// });

export default router;