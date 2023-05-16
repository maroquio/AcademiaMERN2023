import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import FormEntidade from "../../components/FormGrupoMuscular";
import InformModal from "../../components/common/InformModal";
import { authHeader, isAdministrador } from "../../services/authServices";
import handleChange from "../../utils/handleChange";

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
                    .put(`http://localhost:8080/api/gruposmusculares/${idEntidade}`, inputs, { headers: authHeader() })
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
        navigate("/gruposmusculares");
    }

    useEffect(() => {
        const informModal = new bootstrap.Modal("#informModal", {});
        setModal(informModal);
        setInputs({ ...inputs, id: idEntidade });
        axios
            .get(`http://localhost:8080/api/gruposmusculares/${idEntidade}`, { headers: authHeader() })
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
            {!isAdministrador() ? (<Navigate to="/login" />) : (
                <>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>Alteração de Grupo Muscular</h1>
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit} noValidate autoComplete="off">
                        <FormEntidade handleChange={localHandleChange} inputs={inputs} errors={errors} isNew={false} />
                        <div className="mt-3">
                            <Link to="/gruposmusculares" className="btn btn-secondary me-1">
                                Cancelar
                            </Link>
                            <button type="submit" className="btn btn-primary">
                                Salvar
                            </button>
                        </div>
                    </form>
                    <InformModal info="Grupo muscular alterado com sucesso!" action={closeModalAndRedirect} />
                </>
            )}
        </>
    );
};

export default Alteracao;