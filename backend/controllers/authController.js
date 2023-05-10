import Aluno from "../models/Aluno.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const login = async (req, res, next) => {
    try {
        //console.log(req.body);
        const aluno = await Aluno.findOne({ email: req.body.usuario });        
        if (!aluno) { return next(createError(404, "Aluno não encontrado.")); }
        const senhaValida = await bcrypt.compare(req.body.senha, aluno.senha);
        //console.log(senhaValida);
        if (!senhaValida) { 
            console.log("Senha inválida!")
            return next(createError(401, "Senha inválida.")); 
        }
        const { senha, ...dados } = aluno._doc;
        const accessToken = jwt.sign({ id: aluno._id, admin: aluno.ativo }, process.env.JWT_SECRET, { expiresIn: "1h" });
        dados.accessToken = accessToken;
        res.cookie("accessToken", accessToken, { httpOnly: true }).status(200).json(dados);
    } catch (error) {
        next(error);
    }
};