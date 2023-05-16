const FormCheckbox = ({ field, onChange, label, value, error }) => {
    return (
        <>
            <div className="form-check form-switch mt-3">
                <input type="checkbox" className="form-check-input" id={field} name={field} onChange={onChange} checked={value || false} />
                <label className="form-check-label" htmlFor={field}>
                    {label}
                </label>
            </div>
            {error && <p className="m-0 small text-danger">{error}</p>}
        </>
    );
};

export default FormCheckbox;