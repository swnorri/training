export default function InputWrapped({ label, ...props }) {
    function handleFocus(e) {
        e.target.select();
    }
    return (
        <p>
            <label>{label}</label>
            <input {...props}  onFocus={handleFocus}></input>
        </p>
    )
}