import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/common/Loading";
import TableGruposMusculares from "../../components/TableGruposMusculares";
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
                <h1>Grupos Musculares</h1>
                <Authorization perfis={["Administrador"]} redirectToLogin={false}>
                    <Link to="/gruposmusculares/cadastrar" className="btn btn-primary">
                        Novo
                    </Link>
                </Authorization>
            </div>
            <hr />
            {loading ? <Loading /> : <TableGruposMusculares entidades={entidades} setEntidades={setEntidades} />}
        </>
    );
};

export default Listagem;