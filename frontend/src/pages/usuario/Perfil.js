import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import FormAluno from "../../components/FormAluno";
import InformModal from "../../components/common/InformModal";
import { authHeader, getUser } from "../../services/authServices";
import handleChange from "../../utils/handleChange";
import FormButtons from "../../components/common/FormButtons";

const Perfil = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState(undefined);
    const navigate = useNavigate();

    const idUsuario = getUser()._id;
    if (!idUsuario) {
        navigate("/login");
    }

    const validator = yup.object().shape({
        nome: yup.string().required("Nome é obrigatório."),
        dataNascimento: yup.date().required("Data de nascimento é obrigatória."),
        cpf: yup.string().length(11, "CPF está incompleto.").required("CPF é obrigatório."),
        sexo: yup.string().oneOf(["M", "F", "O"], "Gênero está incorreto.").required("Gênero é obrigatório."),
        telefone: yup.string().length(11, "Telefone está incompleto.").required("Telefone é obrigatório."),
        email: yup.string().email("E-mail inválido.").required("E-mail é obrigatório."),
        ativo: yup.boolean().required("Situação é obrigatória."),
    });

    function localHandleChange(event) {
        handleChange(event, inputs, setInputs);
    }

    function handleSubmit(event) {
        event.preventDefault();
        validator
            .validate(inputs, { abortEarly: false })
            .then(() => {
                setErrors({});
                axios
                    .put(`http://localhost:8080/api/usuarios/${idUsuario}`, inputs, { headers: authHeader() })
                    .then((response) => {
                        if (response.status === 200) {
                            modal.show();
                        } else {
                            console.log(response);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                setErrors({});
                error.inner.forEach((err) => {
                    setErrors((prevErrors) => ({ ...prevErrors, [err.path]: err.message }));
                });
            });
    }

    function closeModalAndRedirect() {
        modal.hide();
        navigate("/");
    }

    useEffect(() => {        
        const informModal = new bootstrap.Modal("#informModal", {});
        setModal(informModal);
        setInputs({ ...inputs, id: idUsuario });
        axios
            .get(`http://localhost:8080/api/usuarios/${idUsuario}`, { headers: authHeader() })
            .then((response) => {
                if (response.status === 200) {
                    setInputs(response.data);
                } else {
                    console.log(response);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idUsuario]);

    useEffect(() => {        
        if (inputs && Object.keys(inputs).length > 0) {
            validator
                .validate(inputs, { abortEarly: false })
                .then(() => {                    
                    setErrors({});
                })
                .catch((error) => {
                    setErrors({});
                    error.inner.forEach((err) => {
                        setErrors((prevErrors) => ({ ...prevErrors, [err.path]: err.message }));
                    });
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputs]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Seus Dados de Perfil</h1>
            </div>
            <hr />
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <FormAluno handleChange={localHandleChange} inputs={inputs} errors={errors} isNew={false} />
                <FormButtons cancelTarget="/" />
            </form>
            <InformModal info="Dados de perfil alterados com sucesso!" action={closeModalAndRedirect} />            
        </>
    );
};

export default Perfil;