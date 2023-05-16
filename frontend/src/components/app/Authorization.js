import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../services/authServices';

const Authorization = ({ perfil, children }) => {
    // Obtém dados do usuário logado no momento
    const usuario = getUser();

    // Verifica se o usuário está logado e se pertence ao perfil esperado
    // Se não passar perfil, basta ser usuário logado
    if ((usuario && !perfil ) || (usuario && usuario.perfil === perfil)) {
        return children;
    }

    // Se o usuário não estiver logado ou não pertencer ao perfil esperado,
    // redireciona para a página de login
    return <Navigate to="/login" />;
};

Authorization.propTypes = {
    perfil: PropTypes.oneOf(['Aluno', 'Instrutor', 'Administrador']),
    children: PropTypes.node.isRequired,
};

export default Authorization;