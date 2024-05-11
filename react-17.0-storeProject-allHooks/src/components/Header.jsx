import { useState, useContext, useCallback } from 'react';
import { CartContext } from "../utils/shopping-cart-context.jsx";

import Logo from '../assets/logo.jpg';
import CartModal from "../modals/CartModal.jsx";
import CheckoutModal from "../modals/CheckoutModal.jsx";

export default function Header() {
    const { totalItems } = useContext(CartContext);
    const [isModalOpen, setIsModalOpen] = useState({
        cart: false,
        checkout: false
    });

    const handleModalState = useCallback(function handleModalState(name, show = false) {
        setIsModalOpen((prev) => {
            return {
                ...prev,
                [name]: show
            }
        });
    }, []);

    const handleToggleCheckout = useCallback(function handleToggleCheckout() {
        handleModalState('cart');
        handleModalState('checkout', true)
    }, []);


    return (
        <>
            <header id="main-header">
                <div id="title">
                    <img src={Logo} alt="Restaurant Image" />
                    <h1>REACTFOOD</h1>
                </div>
                <nav>
                    <button
                        type="button"
                        className='text-button'
                        onClick={() => handleModalState('cart', true)}
                    >Cart ({totalItems})</button>
                </nav>
            </header>
            {isModalOpen.cart &&
                <CartModal
                    open={isModalOpen.cart}
                    onClose={() => handleModalState('cart')}
                    toggleCheckout={handleToggleCheckout}
                />
            }
            {isModalOpen.checkout &&
                <CheckoutModal
                    open={isModalOpen.checkout}
                    onClose={() => handleModalState('checkout')}
                />
            }
        </>
    )
}