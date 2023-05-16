import { Usuario } from "../models/Usuario.js";


export const updateUsuario = async (req, res, next) => {
    try {
        const updatedUsuario = await Usuario.findByIdAndUpdate(req.params.id, {
            $set:
                req.body
        }, { new: true });
        res.status(200).json(updatedUsuario);
    } catch (error) {
        next(error);
    }
};

export const getUsuario = async (req, res, next) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
};

export const getUsuarios = async (req, res, next) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        next(error);
    }
};