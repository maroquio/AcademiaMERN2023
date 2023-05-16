import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/common/Loading";
import TableInstrutores from "../../components/TableInstrutores";
import { authHeader } from "../../services/authServices";
import "./Listagem.css";
import Authorization from "../../components/app/Authorization";

const Listagem = () => {
    const [instrutores, setInstrutores] = useState([]);
    const [loading, setLoading] = useState(true);

    const carregarInstrutores = () => {
        axios
            .get("http://localhost:8080/api/instrutores", { headers: authHeader() })
            .then((response) => {
                setInstrutores(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        carregarInstrutores();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Instrutores</h1>
                <Authorization perfil="Administrador">
                    <Link to="/instrutores/cadastrar" className="btn btn-primary">
                        Novo
                    </Link>
                </Authorization>
            </div>
            <hr />
            {loading ? <Loading /> : <TableInstrutores instrutores={instrutores} setInstrutores={setInstrutores} />}
        </>
    );
};

export default Listagem;