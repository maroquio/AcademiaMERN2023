import { Link } from "react-router-dom"

const FormButtons = ({cancelTarget}) => {
    return (
        <div className="mt-3">
            <Link to={cancelTarget} className="btn btn-secondary me-3">
                Cancelar
            </Link>
            <button type="submit" className="btn btn-primary">
                Salvar
            </button>
        </div>
    )
}

export default FormButtons;