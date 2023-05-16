import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leiaute from "./pages/Leiaute";
import Principal from "./pages/Principal";
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./pages/Login";
import Logout from "./pages/usuario/Logout";
import Alunos from "./pages/aluno/Listagem";
import CadastroAluno from "./pages/aluno/Cadastro";
import AlteracaoAluno from "./pages/aluno/Alteracao";
import PerfilUsuario from "./pages/usuario/Perfil";
import Instrutores from "./pages/instrutor/Listagem";
import CadastroInstrutor from "./pages/instrutor/Cadastro";
import AlteracaoInstrutor from "./pages/instrutor/Alteracao";
import GruposMusculares from "./pages/grupoMuscular/Listagem";
import CadastroGrupoMuscular from "./pages/grupoMuscular/Cadastro";
import AlteracaoGrupoMuscular from "./pages/grupoMuscular/Alteracao";
import AlterarSenha from "./pages/usuario/AlterarSenha";
import Authorization from "./components/app/Authorization";


const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Leiaute />}>
                        <Route index element={<Authorization><Principal /></Authorization>} />
                        <Route path="usuarios">                            
                            <Route path="perfil" element={<Authorization><PerfilUsuario /></Authorization>} />
                            <Route path="alterarsenha" element={<Authorization><AlterarSenha /></Authorization>} />
                            <Route path="logout" element={<Authorization><Logout /></Authorization>} />
                        </Route>
                        <Route path="alunos">
                            <Route index element={<Authorization perfil="Instrutor"><Alunos /></Authorization>} />
                            <Route path="cadastrar" element={<Authorization perfil="Administrador"><CadastroAluno /></Authorization>} />
                            <Route path="alterar/:id" element={<Authorization perfil="Administrador"><AlteracaoAluno /></Authorization>} />
                        </Route>
                        <Route path="instrutores">
                            <Route index element={<Authorization perfil="Administrador"><Instrutores /></Authorization>} />
                            <Route path="cadastrar" element={<Authorization perfil="Administrador"><CadastroInstrutor /></Authorization>} />
                            <Route path="alterar/:id" element={<Authorization perfil="Administrador"><AlteracaoInstrutor /></Authorization>} />
                        </Route>                        
                        <Route path="gruposmusculares">
                            <Route index element={<Authorization perfil="Instrutor"><GruposMusculares /></Authorization>} />
                            <Route path="cadastrar" element={<Authorization perfil="Administrador"><CadastroGrupoMuscular /></Authorization>} />
                            <Route path="alterar/:id" element={<Authorization perfil="Administrador"><AlteracaoGrupoMuscular /></Authorization>} />
                        </Route>                        
                    </Route>
                    <Route path="/login" element={<Login />} />                    
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;