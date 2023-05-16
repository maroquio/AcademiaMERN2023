import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDatabase from "./config/db.js";
import routeAlunos from "./routes/alunoRoutes.js";
import routeInstrutores from "./routes/instrutorRoutes.js";
import routeUsuarios from "./routes/usuarioRoutes.js";
import routeGruposMusculares from "./routes/grupoMuscularRoutes.js";
import routeTiposExercicios from "./routes/tipoExercicioRoutes.js";
import routeAuth from "./routes/authRoutes.js";
import { errorHandling } from "./utils/error.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandling);
app.use("/api/auth", routeAuth);
app.use("/api/alunos", routeAlunos);
app.use("/api/instrutores", routeInstrutores);
app.use("/api/usuarios", routeUsuarios);
app.use("/api/gruposmusculares", routeGruposMusculares);
app.use("/api/tiposexercicios", routeTiposExercicios);

app.listen(8080, () => {
    connectDatabase();
    console.log("Servidor rodando na porta 8080.");
});
