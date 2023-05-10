import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;

// Esquema base
const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true,
    },
    dataNascimento: {
        type: Date,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        trim: true,
    },
    sexo: {
        type: String,
        required: true,
        trim: true,
        enum: ["M", "F"],
    },
    telefone: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        validate: {
            validator: validator.isEmail,
            message: "E-mail inválido.",
        },
    },
    senha: {
        type: String,
        required: true,
    },
    ativo: {
        type: Boolean,
        default: false,
    }
}, { discriminatorKey: 'tipo' });

// Modelo base
const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Discriminadores
const Instrutor = Usuario.discriminator('Instrutor', new Schema({ admin: Boolean }));
const Aluno = Usuario.discriminator('Aluno', new Schema({ fichas: [{ type: Schema.Types.ObjectId, ref: 'Ficha' }] }));

export {
    Usuario,
    Instrutor,
    Aluno
};