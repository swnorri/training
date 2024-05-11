import { useContext, useRef, useState, useCallback } from 'react';
import { CartContext } from "../utils/shopping-cart-context.jsx";
import { fetchData } from '../fetch/http.js';

import Input from '../components/ControlInput.jsx';
import Modal from './Modal.jsx';

const USER_COLLECTION = {
    name: '',
    email: '',
    street: '',
    'postal-code': '',
    city: ''
};
export default function CheckoutModal({ ...props }) {
    const [userInput, setUserInput] = useState(USER_COLLECTION);
    const { items, totalPrice } = useContext(CartContext);
    const checkoutModal = useRef();

    const handleClose = useCallback(function handleClose() {
        checkoutModal.current.close()
    }, []);
    const handleChange = useCallback(function handleChange(e) {
        setUserInput((prevInput) => {
            return {
                ...prevInput,
                [e.target.id]: e.target.value
            }
        })
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const order = await fetchData('orders', {
            items: [...items],
            customer: { ...userInput }
        });
        if (order)
            console.log(order)
    }
    return (
        <Modal {...props} ref={checkoutModal}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount ${totalPrice.toFixed(2)}</p>
                <Input
                    name="name"
                    title="Full Name"
                    required
                    value={userInput.name}
                    handleChange={handleChange}
                />
                <Input
                    type="email"
                    name="email"
                    title="E-Mail Address"
                    required
                    value={userInput.email}
                    handleChange={handleChange}
                />
                <Input
                    name="street"
                    title="Street"
                    required
                    value={userInput.street}
                    handleChange={handleChange}
                />
                <div className="control-row">
                    <Input
                        name="postal-code"
                        title="Postal Code"
                        required
                        pattern="[0-9]{5}"
                        maxLength={5}
                        value={userInput['postal-code']}
                        handleChange={handleChange}
                    />
                    <Input
                        name="city"
                        title="City"
                        required
                        value={userInput.city}
                        handleChange={handleChange}
                    />
                </div>
                <p className="modal-actions">
                    <button
                        type="button"
                        className="text-button"
                        onClick={handleClose}
                    >Close</button>
                    <button
                        type="submit"
                        className="button"
                    >Submit Order</button>
                </p>
            </form>
        </Modal>
    )
}