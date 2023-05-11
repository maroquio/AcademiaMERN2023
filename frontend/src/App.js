import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leiaute from "./pages/Leiaute";
import Principal from "./pages/Principal";
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Alunos from "./pages/aluno/Listagem";
import CadastroAluno from "./pages/aluno/Cadastro";
import AlteracaoAluno from "./pages/aluno/Alteracao";
import AlunosAtivos from "./pages/aluno/Ativos";
import Instrutores from "./pages/instrutor/Listagem";
import CadastroInstrutor from "./pages/instrutor/Cadastro";
import AlteracaoInstrutor from "./pages/instrutor/Alteracao";
import InstrutoresAtivos from "./pages/instrutor/Ativos";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Leiaute />}>
                        <Route index element={<Principal />} />
                        <Route path="alunos">
                            <Route index element={<Alunos />} />
                            <Route path="cadastrar" element={<CadastroAluno />} />
                            <Route path="alterar/:id" element={<AlteracaoAluno />} />
                            <Route path="ativos" element={<AlunosAtivos />} />
                        </Route>
                        <Route path="instrutores">
                            <Route index element={<Instrutores />} />
                            <Route path="cadastrar" element={<CadastroInstrutor />} />
                            <Route path="alterar/:id" element={<AlteracaoInstrutor />} />
                            <Route path="ativos" element={<InstrutoresAtivos />} />
                        </Route>
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;