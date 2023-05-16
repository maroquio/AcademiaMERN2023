import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Loading from "../../components/common/Loading";
import TableInstrutores from "../../components/TableInstrutores";
import { authHeader, isAdministrador } from "../../services/authServices";
import "./Listagem.css";

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
                {isAdministrador() && (
                    <Link to="/instrutores/cadastrar" className="btn btn-primary">
                        Novo
                    </Link>
                )}
            </div>
            <hr />
            {isAdministrador() ? (
            loading ? <Loading /> : <TableInstrutores instrutores={instrutores} setInstrutores={setInstrutores} />
            ) : (<Navigate to="/login" />)}
        </>
    );
};

export default Listagem;