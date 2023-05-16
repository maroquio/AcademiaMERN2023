import { Link, NavLink } from "react-router-dom";
import { getUser, isAdministrador, isAuthenticated, isInstrutor } from "../../services/authServices";

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3 sticky-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <span className="fs-3 bg-white rounded me-2">🏋</span>
                        <span className="fs-3">Academia</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navMenu">
                        <div className="navbar-nav">
                            <NavLink to="/" className="nav-link">
                                Principal
                            </NavLink>
                            {(isAdministrador() || isInstrutor()) && (
                                <NavLink to="/alunos" className="nav-link">
                                    Alunos
                                </NavLink>
                            )}
                            {isAdministrador() && (
                                <>
                                    <NavLink to="/instrutores" className="nav-link">
                                        Instrutores
                                    </NavLink>
                                    <NavLink to="/gruposmusculares" className="nav-link">
                                        Grupos Musculares
                                    </NavLink>
                                </>
                            )}
                            {isAuthenticated() && (
                                <li className="nav-item dropdown">
                                    <button className="btn btn-link nav-link dropdown-toggle text-light" type="button" data-bs-toggle="dropdown">
                                        Olá, <b>{getUser().nome}</b>!
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                                        <li><Link to="/usuarios/perfil" className="nav-link text-light">Meu Perfil</Link></li>
                                        <li><Link to="/alunos/fichas" className="nav-link text-light">Minhas Fichas</Link></li>
                                        <li><Link to="/usuarios/alterarsenha" className="nav-link text-light">Alterar Senha</Link></li>
                                        <li><hr className="dropdown-divider bg-light" /></li>
                                        <li><Link to="/usuarios/logout" className="nav-link text-light">Sair</Link></li>
                                    </ul>

                                </li>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
