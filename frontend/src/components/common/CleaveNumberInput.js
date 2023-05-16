//https://nosir.github.io/cleave.js/
//https://blog.logrocket.com/formatting-form-inputs-with-cleave-js-and-react/

import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.br";

const CleaveNumberInput = ({ type, field, placeholder, onChange, options, label, value, error, min, max, step }) => {
    return (
        <>
            <label htmlFor={field}>{label}</label>
            <div class="input-group mb-3">
                <button class="btn btn-outline-secondary" type="button" id="button-addon1">
                    <i className="bi bi-plus"></i>
                </button>
                <Cleave type={type} className={`form-control ${error ? "is-invalid" : "is-valid"}`} id={field} name={field} placeholder={placeholder} onChange={onChange} options={options} value={value} min={min} max={max} step={step} />
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                    <i className="bi bi-minus"></i>
                </button>
            </div>
            {error && <p className="m-0 small text-danger">{error}</p>}
        </>
    );
};

export default CleaveNumberInput;