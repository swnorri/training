import { createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

function shoppingCartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const updatedItems = [...state.items];
            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem.id === action.payload
            );
            const existingCartItem = updatedItems[existingCartItemIndex];
            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
                updatedItems.push({
                    id: action.payload,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                });
            }
            return {
                ...state, // wasnt needed, just example
                items: updatedItems,
            };
            break;
        }
        case 'UPDATE_ITEM': {
            const updatedItems = [...state.items];
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.id
            );
            const updatedItem = {
                ...updatedItems[updatedItemIndex],
            };

            updatedItem.quantity += action.payload.amount;

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }
            return {
                ...state, // wasnt needed, just example
                items: updatedItems,
            };
            break
        }
    }
}

export default function CartConextProvider({ children }) {
    const [ShoppingState, shoppingDispatch] = useReducer(
        shoppingCartReducer,
        {
            items: [],
        });
        
    function handleAddItemToCart(id) {
        shoppingDispatch({
            type: 'ADD_ITEM',
            payload: id
        });
    }
    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                id: productId,
                amount
            }
        });
    }
    return (
        <CartContext.Provider value={{
            items: ShoppingState.items,
            addItemToCart: handleAddItemToCart,
            updateCartItemQuantity: handleUpdateCartItemQuantity
        }}>{children}</CartContext.Provider>
    )
}

export const CartContext = createContext({
    items: [],
    addItemToCart: () => { },
    updateCartItemQuantity: () => { },
});


