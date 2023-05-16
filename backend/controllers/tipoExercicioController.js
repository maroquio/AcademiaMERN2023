import TipoExercicio from "../models/TipoExercicio.js";

export const createTipoExercicio = async (req, res, next) => {
    const tipoExercicio = new TipoExercicio(req.body);
    try {
        const createdTipoExercicio = await tipoExercicio.save();
        res.status(201).json(createdTipoExercicio);
    } catch (error) {
        next(error);
    }
};

export const updateTipoExercicio = async (req, res, next) => {
    try {
        const updatedTipoExercicio = await TipoExercicio.findByIdAndUpdate(req.params.id, {
            $set:
                req.body
        }, { new: true });
        res.status(200).json(updatedTipoExercicio);
    } catch (error) {
        next(error);
    }
};

export const deleteTipoExercicio = async (req, res, next) => {
    try {
        await TipoExercicio.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Tipo de exercício excluído com sucesso." });
    } catch (error) {
        next(error);
    }
};

export const getTipoExercicio = async (req, res, next) => {
    try {
        const tipoExercicio = await TipoExercicio.findById(req.params.id);
        res.status(200).json(tipoExercicio);
    } catch (error) {
        next(error);
    }
};

export const getTiposExercicios = async (req, res, next) => {
    try {
        const tiposExercicios = await TipoExercicio.find();
        res.status(200).json(tiposExercicios);
    } catch (error) {
        next(error);
    }
};