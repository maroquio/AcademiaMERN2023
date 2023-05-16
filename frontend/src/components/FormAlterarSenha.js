import FormInput from "./common/FormInput";

const FormAlterarSenha = ({ handleChange, inputs, errors }) => {
    return (
        <>
            <div className="col-6 col-sm-4">
                <FormInput type="password" field="senhaAtual" placeholder="Senha" label="Senha Atual" onChange={handleChange} value={inputs?.senhaAtual} error={errors?.senhaAtual} autofocus={true} />
            </div>
            <div className="col-6 col-sm-4">
                <FormInput type="password" field="novaSenha" placeholder="Senha" label="Nova Senha" onChange={handleChange} value={inputs?.novaSenha} error={errors?.novaSenha} />
            </div>
            <div className="col-6 col-sm-4">
                <FormInput type="password" field="confNovaSenha" placeholder="Confirme sua nova senha" label="Confirmação de Nova Senha" onChange={handleChange} value={inputs?.confNovaSenha} error={errors?.confNovaSenha} />
            </div>
        </>
    )
}

export default FormAlterarSenha;