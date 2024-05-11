import { createContext, useReducer, useCallback } from 'react';

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const cloneItems = [...state.items];
            const existingIdx = cloneItems.findIndex(
                item => item.id === action.id
            );
            const existingItem = cloneItems[existingIdx];

            if (existingItem) {
                cloneItems[existingIdx] = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                };
            } else {
                cloneItems.push({
                    ...action,
                    quantity: 1,
                });
            }
            return {
                ...state,
                items: cloneItems,
            };
            break;
        }
        case 'MOD_ITEM': {
            const cloneItems = [...state.items];
            const existingIdx = cloneItems.findIndex(
                (item) => item.id === action.id
            );
            const updatedItem = {
                ...cloneItems[existingIdx],
            };

            updatedItem.quantity += action.amount;

            if (updatedItem.quantity <= 0) {
                cloneItems.splice(existingIdx, 1);
            } else {
                cloneItems[existingIdx] = updatedItem;
            }
            return {
                ...state,
                items: cloneItems
            };
            break
        }
    }
}

export default function CartConextProvider({ children }) {
    const [cartState, cartDispatch] = useReducer(
        cartReducer,
        {
            items: []
        }
    );
    let totalItems = cartState.items.reduce((acc, item) => {
        return acc + item.quantity
    }, 0);
    let totalPrice = cartState.items.reduce((acc, item) => {
        return acc + (item.quantity * item.price)
    }, 0);

    const handleAddToCart = useCallback(function handleAddToCart(payload) {
        cartDispatch({
            type: 'ADD_ITEM',
            ...payload
        });
    }, []);
    const handleModItemQty = useCallback(function handleModItemQty(payload) {
        cartDispatch({
            type: 'MOD_ITEM',
            ...payload
        });
    }, []);

    return (
        <CartContext.Provider value={{
            items: cartState.items,
            totalItems: totalItems,
            totalPrice: totalPrice,
            addToCart: handleAddToCart,
            modItemQty: handleModItemQty
        }}>{children}</CartContext.Provider>
    )
}
export const CartContext = createContext({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    addToCart: () => { },
    modItemQty: () => { }
});

// import { useContext } from 'react';
// import { CartContext } from "../store/shopping-cart-context";
// const { items, addToCart, modItemQty } = useContext(CartContext);