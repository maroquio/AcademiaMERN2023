import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import InformModal from "../../components/common/InformModal";
import { authHeader } from "../../services/authServices";
import handleChange from "../../utils/handleChange";
import FormAlterarSenha from "../../components/FormAlterarSenha";
import FormButtons from "../../components/common/FormButtons";

const AlterarSenha = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState(undefined);

    const navigate = useNavigate();

    //https://github.com/jquense/yup
    const validator = yup.object().shape({
        senhaAtual: yup.string().min(6, "Senha atual deve ter pelo menos 6 caracteres.").max(12, "Senha atual deve ter no máximo 12 caracteres.").required("Senha atual é obrigatória."),
        novaSenha: yup.string().min(6, "Nova senha deve ter pelo menos 6 caracteres.").max(12, "Nova senha deve ter no máximo 12 caracteres.").required("Nova senha é obrigatória."),
        confNovaSenha: yup
            .string()
            .oneOf([yup.ref("novaSenha"), null], "Confirmação de Senha e Nova Senha devem ser iguais.")
            .required("Confirmação de Senha é obrigatória."),
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
                    .post("http://localhost:8080/api/auth/alterarsenha", inputs, { headers: authHeader() })
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
    }, []);

    useEffect(() => {
        if (Object.keys(inputs).length > 0) {
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
                <h1>Alteração de Senha</h1>
            </div>
            <hr />
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <FormAlterarSenha handleChange={localHandleChange} inputs={inputs} errors={errors} />
                <FormButtons cancelTarget="/" />
            </form>
            <InformModal info="Senha alterada com sucesso!" action={closeModalAndRedirect} />
        </>
    );
};

export default AlterarSenha;