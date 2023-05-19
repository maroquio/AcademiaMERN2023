import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../services/authServices';

const Authorization = ({ perfis, children, redirectToLogin=true }) => {
    // Obtém dados do usuário logado no momento
    const usuario = getUser();

    // Verifica se o usuário está logado e se pertence ao perfil esperado
    // Se não passar perfil, basta ser usuário logado
    if ((usuario && !perfis ) || (usuario && perfis.includes(usuario.perfil))) {
        return children;
    }

    // Se o usuário não estiver logado ou não pertencer ao perfil esperado,
    // redireciona para a página de login
    if (redirectToLogin) {
        return <Navigate to="/login" />;
    } else {
        return null;
    }
};

Authorization.propTypes = {
    perfis: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node.isRequired,
    redirectToLogin: PropTypes.bool,
};

export default Authorization;