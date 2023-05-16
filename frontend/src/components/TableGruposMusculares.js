import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ConfirmModal from "./common/ConfirmModal";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { authHeader, isAdministrador } from "../services/authServices";

const TableGrupoMuscular = ({ entidades, setEntidades }) => {
    const [entidadeExcluir, setEntidadeExcluir] = useState(null);
    const [modal, setModal] = useState(undefined);

    function confirmarExclusao(entidade) {
        setEntidadeExcluir(entidade);
        const confirmModal = new bootstrap.Modal("#confirmModal", {});
        setModal(confirmModal);
        confirmModal.show();
    }

    function excluirEntidade() {
        axios.delete(`http://localhost:8080/api/gruposmusculares/${entidadeExcluir._id}`, { headers: authHeader() })
            .then((data) => {
                const entidadesAtualizadas = entidades.filter((aluno) => aluno._id !== entidadeExcluir._id);
                setEntidades(entidadesAtualizadas);
                modal.hide();
            })
            .catch((error) => {
                console.log(error);
                modal.hide();
            });
    }

    return entidades.length === 0 ? (
        <div className="alert alert-info">Nenhum grupo muscular cadastrado.</div>
    ) : (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {entidades.map((entidade) => (
                        <tr key={entidade._id}>
                            <td>{entidade.nome}</td>
                            <td>
                                {isAdministrador() ? (
                                    <>
                                        <Link className="btn btn-sm btn-warning me-1" to={`/gruposmusculares/alterar/${entidade._id}`}>
                                            <i className="bi bi-pen" title="Alterar"></i>
                                        </Link>
                                        <button className="btn btn-sm btn-danger" onClick={() => confirmarExclusao(entidade)}>
                                            <i className="bi bi-trash" title="Excluir"></i>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-x-circle"></i>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmModal question={`Deseja realmente excluir o grupo muscular ${entidadeExcluir?.nome}?`} action={excluirEntidade} />
        </>
    );
};

export default TableGrupoMuscular;