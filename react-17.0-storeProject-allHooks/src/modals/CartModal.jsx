import { useContext, useRef } from 'react';
import { CartContext } from "../utils/shopping-cart-context.jsx";

import Modal from './Modal.jsx';
import CartItem from './CartItem.jsx';

export default function CartModal({ toggleCheckout, ...props }) {
    const { items, totalPrice, modItemQty } = useContext(CartContext);
    const cartModal = useRef();

    function handleClose() {
        cartModal.current.close()
    }

    return (
        <Modal {...props} ref={cartModal}>
            <div className="cart">
                <h2>Your Cart</h2>
                <ul>
                    {items.map(
                        (item) => <CartItem
                            key={item.id}
                            handleModItemQty={modItemQty}
                            {...item}
                        />
                    )}
                </ul>
                <p className="cart-total">${totalPrice.toFixed(2)}</p>
            </div>
            <p className="modal-actions">
                <button
                    type="button"
                    className="text-button"
                    onClick={handleClose}
                >Close</button>
                <button
                    className="button"
                    onClick={toggleCheckout}
                    disabled={totalPrice <= 0}
                >Go to Checkout</button>
            </p>
        </Modal>
    )
}