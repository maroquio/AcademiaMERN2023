import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verificarToken = (req, res, next) => {
    try {        
        //const accessToken = req.cookies.accessToken;
        const accessToken = req.headers["x-access-token"];        
        if (!accessToken) { 
            return next(createError(401, "Você não está autenticado.")); 
        }
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);        
        req.usuario = decoded;
        console.log(req.usuario);
        next();
    } catch (error) {
        next(error);
    }
}

export const verificarAutenticado = (req, res, next) => {
    verificarToken(req, res, () => {
        if (!req.usuario) {
            return next(createError(401, "Usuário não autenticado."));
        }
        if (req.usuario.id === req.params.id || req.usuario.admin) {
            next();
        }
        else {
            return next(createError(403, "Usuário não tem permissão para acessar este recurso."));
        }
    });
}

export const verificarAluno = (req, res, next) => {
    verificarToken(req, res, () => {
        if (!req.usuario) {
            return next(createError(401, "Usuário não autenticado."));
        }
        if ((req.usuario.perfil === "Aluno" && req.usuario.id === req.params.id) || req.usuario.admin || req.usuario.perfil === "Instrutor") {
            next();
        }
        else {
            return next(createError(403, "Usuário não tem permissão para acessar este recurso."));
        }
    });
}

export const verificarInstrutor = (req, res, next) => {
    verificarToken(req, res, () => {        
        if (!req.usuario) {
            return next(createError(401, "Usuário não autenticado."));
        }
        if (req.usuario.perfil === "Instrutor") {
            next();
        }
        else {
            return next(createError(403, "Usuário não tem permissão para acessar este recurso."));
        }
    });
}

export const verificarAdministrador = (req, res, next) => {
    verificarToken(req, res, () => {        
        if (!req.usuario) {
            return next(createError(401, "Usuário não autenticado."));
        }
        if (req.usuario.perfil === "Instrutor" && req.usuario.admin) {
            next();
        }
        else {
            return next(createError(403, "Usuário não tem permissão para acessar este recurso."));
        }
    });
}