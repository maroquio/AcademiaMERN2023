import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import FormEntidade from "../../components/FormTipoExercicio";
import InformModal from "../../components/common/InformModal";
import { authHeader } from "../../services/authServices";
import handleChange from "../../utils/handleChange";
import FormButtons from "../../components/common/FormButtons";

const Alteracao = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState(undefined);
    const navigate = useNavigate();

    const idEntidade = useParams().id;
    if (!idEntidade) {
        navigate("/listagem");
    }

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
                    .put(`http://localhost:8080/api/tiposexercicios/${idEntidade}`, inputs, { headers: authHeader() })
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
        navigate("/tiposexercicios");
    }

    useEffect(() => {
        const informModal = new bootstrap.Modal("#informModal", {});
        setModal(informModal);
        setInputs({ ...inputs, id: idEntidade });
        axios
            .get(`http://localhost:8080/api/tiposexercicios/${idEntidade}`, { headers: authHeader() })
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
    }, [idEntidade]);

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
                <h1>Alteração de Grupo Muscular</h1>
            </div>
            <hr />
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <FormEntidade handleChange={localHandleChange} inputs={inputs} errors={errors} isNew={false} />
                <FormButtons cancelTarget="/tiposexercicios" />
            </form>
            <InformModal info="Tipo de exercício alterado com sucesso!" action={closeModalAndRedirect} />
        </>
    );
};

export default Alteracao;