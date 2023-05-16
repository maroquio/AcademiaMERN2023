import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import FormEntidade from "../../components/FormGrupoMuscular";
import InformModal from "../../components/common/InformModal";
import { authHeader } from "../../services/authServices";
import handleChange from "../../utils/handleChange";
import FormButtons from "../../components/common/FormButtons";

const Cadastro = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState(undefined);

    const navigate = useNavigate();

    //https://github.com/jquense/yup
    const validator = yup.object().shape({
        nome: yup.string().required("Nome é obrigatório."),
        pesoMinimo: yup.number().required("Peso mínimo é obrigatório.").min(0, "Peso mínimo deve ser maior ou igual a 0.").max(999, "Peso mínimo deve ser menor ou igual a 999."),
        pesoMaximo: yup.number().required("Peso máximo é obrigatório.").min(0, "Peso máximo deve ser maior ou igual a 0.").max(999, "Peso máximo deve ser menor ou igual a 999."),
        degrauPeso: yup.number().required("Degrau é obrigatório.").min(0, "Degrau deve ser maior ou igual a 0.").max(50, "Degrau deve ser menor ou igual a 50."),
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
                    .post("http://localhost:8080/api/tiposexercicios", inputs, { headers: authHeader() })
                    .then((response) => {
                        if (response.status === 201) {
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
        navigate("/gruposmusculares");
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
                    //necessário porque quando corrigia o último erro, ele não era eliminado
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
                <h1>Novo Tipo de Exercício</h1>
            </div>
            <hr />
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <FormEntidade handleChange={localHandleChange} inputs={inputs} errors={errors} isNew={true} />
                <FormButtons cancelTarget="/tiposexercicios" />
            </form>
            <InformModal info="Tipo de exercício cadastrado com sucesso!" action={closeModalAndRedirect} />
        </>
    );
};

export default Cadastro;