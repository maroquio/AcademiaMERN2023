import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/common/Loading";
import TableTiposExercicios from "../../components/tipoExercicio/TableTiposExercicios";
import { authHeader } from "../../services/authServices";
import "./Listagem.css";
import Authorization from "../../components/app/Authorization";

const Listagem = () => {
    const [entidades, setEntidades] = useState([]);
    const [loading, setLoading] = useState(true);

    const carregarEntidades = () => {
        axios
            .get("http://localhost:8080/api/gruposmusculares", { headers: authHeader() })
            .then((response) => {
                setEntidades(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        carregarEntidades();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Tipos de Exercícios</h1>
                <Authorization perfis={["Administrador"]} redirectToLogin={false}>
                    <Link to="/tiposexercicios/cadastrar" className="btn btn-primary">
                        Novo
                    </Link>
                </Authorization>
            </div>
            <hr />
            {loading ? <Loading /> : <TableTiposExercicios entidades={entidades} setEntidades={setEntidades} />}
        </>
    );
};

export default Listagem;