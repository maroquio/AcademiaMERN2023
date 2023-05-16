import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
                <h1>Página não encontrada!</h1>
                <p>
                    <Link to="/" className="btn btn-dark">Voltar à Página Inicial</Link>
                </p>
            </div>
        </>
    );
};

export default NotFound;
