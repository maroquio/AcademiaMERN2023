import { Usuario } from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const login = async (req, res, next) => {
    try {
        //console.log(req.body);
        const usuario = await Usuario.findOne({ email: req.body.usuario });        
        if (!usuario) { return next(createError(404, "Usuário não encontrado.")); }
        const senhaValida = await bcrypt.compare(req.body.senha, usuario.senha);
        //console.log(senhaValida);
        if (!senhaValida) { 
            console.log("Senha inválida!")
            return next(createError(401, "Senha inválida.")); 
        }
        const { senha, ...dados } = usuario._doc;
        let expiresTime = req.body.lembrar ? "7d" : "1h";
        const accessToken = jwt.sign({ id: usuario._id, admin: usuario.admin && usuario.admin === true ? true : false, perfil: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: expiresTime });
        dados.accessToken = accessToken;
        res.cookie("accessToken", accessToken, { httpOnly: true }).status(200).json(dados);
    } catch (error) {
        next(error);
    }
};