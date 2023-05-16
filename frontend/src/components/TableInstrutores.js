import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ConfirmModal from "./common/ConfirmModal";
import parse from "html-react-parser";
import purify from "dompurify";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { authHeader, isAdministrador } from "../services/authServices";

const TableInstrutores = ({ instrutores, setInstrutores }) => {
    const [instrutorExcluir, setInstrutorExcluir] = useState(null);
    const [modal, setModal] = useState(undefined);

    function confirmarExclusao(instrutor) {
        setInstrutorExcluir(instrutor);
        const confirmModal = new bootstrap.Modal("#confirmModal", {});
        setModal(confirmModal);
        confirmModal.show();
    }

    function excluirInstrutor() {
        axios.delete(`http://localhost:8080/api/instrutores/${instrutorExcluir._id}`, { headers: authHeader() })
            .then((data) => {
                const instrutoresAtualizados = instrutores.filter((instrutor) => instrutor._id !== instrutorExcluir._id);
                setInstrutores(instrutoresAtualizados);
                modal.hide();
            })
            .catch((error) => {
                console.log(error);
                modal.hide();
            });
    }

    return instrutores.length === 0 ? (
        <div className="alert alert-info">Nenhum instrutor cadastrado.</div>
    ) : (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data Nascimento</th>
                        <th>E-mail</th>
                        <th>Sexo</th>
                        <th>Administrador</th>
                        <th>Situação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {instrutores.map((instrutor) => (
                        <tr key={instrutor._id}>
                            <td>{instrutor.admin ? parse(purify.sanitize(`<b>${instrutor.nome}</b>`)) : instrutor.nome}</td>
                            <td>{new Date(instrutor.dataNascimento.substring(0, 10) + "T12:00:00").toLocaleDateString()}</td>
                            <td>{instrutor.email}</td>
                            <td>{instrutor.sexo === "M" ? "Masculino" : "Feminino"}</td>
                            <td>{instrutor.admin ? "Sim" : "Não"}</td>
                            <td>{instrutor.ativo ? "Ativo" : "Inativo"}</td>
                            <td>
                                {isAdministrador() ? (
                                    <>
                                        <Link className="btn btn-sm btn-warning me-1" to={`/instrutores/alterar/${instrutor._id}`}>
                                            <i className="bi bi-pen" title="Excluir"></i>
                                        </Link>
                                        <button className="btn btn-sm btn-danger" onClick={() => confirmarExclusao(instrutor)}>
                                            <i className="bi bi-trash"></i>
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

            <ConfirmModal question={`Deseja realmente excluir o instrutor ${instrutorExcluir?.nome}?`} action={excluirInstrutor} />
        </>
    );
};

export default TableInstrutores;