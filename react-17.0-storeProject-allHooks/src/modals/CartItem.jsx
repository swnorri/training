export default function CartItem({
    id,
    name,
    quantity,
    price,
    handleModItemQty
}) {
    function handleOnClick(num) {
        handleModItemQty({
            id, 
            amount : num
        });
    }
    return (
        <li
            className="cart-item"
            key={id}
        >
            <p>{name} - {quantity} x ${(quantity * price).toFixed(2)}</p>
            <p className="cart-item-actions">
                <button onClick={() => handleOnClick(-1)}>
                    <span>-</span>
                </button>
                <span>{quantity}</span>
                <button onClick={() => handleOnClick(1)}>
                    <span>+</span>
                </button>
            </p>
        </li>
    )
}