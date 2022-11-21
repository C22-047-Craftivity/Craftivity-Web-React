import "../TextField/textfield-style.css";

function TextField({id, placeholder}) {
    return (
        <input id={id} className="form-control custom-input" placeholder={placeholder}/>
    );
}

export default TextField;