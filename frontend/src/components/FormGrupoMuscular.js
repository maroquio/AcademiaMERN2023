import FormInput from "./common/FormInput";

const FormGrupoMuscular = ({ handleChange, inputs, errors }) => {
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6">
                    <FormInput type="text" field="nome" placeholder="Fulano de Tal" label="Nome" onChange={handleChange} value={inputs?.nome} error={errors?.nome} />
                </div>
            </div>
        </>
    );
};

export default FormGrupoMuscular;