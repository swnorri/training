export default function Input({
    type = 'text',
    name,
    title,
    handleChange,
    ...props
}) {
    return (
        <div className="control">
            <label htmlFor={name}>{title}</label>
            <input
                type={type}
                id={name}
                name={name}
                title={title}
                onChange={handleChange}
                {...props}
            />
        </div>
    )
}