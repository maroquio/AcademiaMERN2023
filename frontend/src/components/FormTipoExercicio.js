import CleaveNumberInput from "./common/CleaveNumberInput";
import FormInput from "./common/FormInput";

const FormTipoExercicio = ({ handleChange, inputs, errors }) => {
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6">
                    <FormInput type="text" field="nome" placeholder="Fulano de Tal" label="Nome" onChange={handleChange} value={inputs?.nome} error={errors?.nome} />
                </div>
                <div className="col-12 col-md-6">
                    <CleaveNumberInput type="number" min="0" max="999" step="1" field="pesoMinimo" placeholder="1" label="Peso Mínimo" onChange={handleChange} value={inputs?.nome} error={errors?.nome} options={{ numericOnly: true }} />
                </div>
                <div className="col-12 col-md-6">
                    <CleaveNumberInput type="number" min="0" max="999" step="1" field="pesoMaximo" placeholder="1" label="Peso Máximo" onChange={handleChange} value={inputs?.nome} error={errors?.nome} options={{ numericOnly: true }} />
                </div>
                <div className="col-12 col-md-6">
                    <CleaveNumberInput type="number" min="0" max="999" step="1" field="degrauPeso" placeholder="1" label="Degrau" onChange={handleChange} value={inputs?.nome} error={errors?.nome} options={{ numericOnly: true }} />
                </div>
            </div>
        </>
    );
};

export default FormTipoExercicio;