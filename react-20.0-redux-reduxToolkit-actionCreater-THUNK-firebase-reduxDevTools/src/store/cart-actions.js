import { uiActions } from './ui-slice.js';
import { cartActions } from './cart-slice.js';

const FIRE_BASE = 'https://react-firebase-project-dbe4b-default-rtdb.firebaseio.com/';

export const fetchCartData = () => {
    // action creater function, THUNK
    // redux toolkit gives dispatch when 
    // dispatching fetchCartData function
    return async (dispatch) => {
        const disNot = (obj) => {
            dispatch(uiActions.setNotification({ ...obj }));
        }
        async function fetchData() {
            const resp = await fetch(FIRE_BASE + '/cart.json', {
                method: 'GET'
            });
            if (!resp.ok) {
                throw new Error('Unable to fetch data');
            }
            return await resp.json();
        }
        try {
            const cartData = await fetchData();
            if (cartData) {
                dispatch(cartActions.replaceCart(cartData));
            }
        } catch (error) {
            disNot({
                status: 'error',
                title: 'Error',
                message: 'Updating cart data failed'
            });
        }
    }
}
export const sendCartData = (cart) => {
    // action creater function, THUNK
    // redux toolkit gives dispatch when 
    // dispatching sendCartData function
    return async (dispatch) => {
        const disNot = (obj) => {
            dispatch(uiActions.setNotification({ ...obj }));
        }
        disNot({
            status: 'pending',
            title: 'Sending...',
            message: 'Updating cart data'
        });
        async function sendReq() {
            const resp = await fetch(FIRE_BASE + '/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            });
            if (!resp.ok) {
                throw new Error('Error updating cart data');
            }
        };
        try {
            await sendReq();
            disNot({
                status: 'success',
                title: 'Success',
                message: 'Successfully updated cart data'
            });
        } catch (error) {
            disNot({
                status: 'error',
                title: 'Error',
                message: 'Updating cart data failed'
            });
        }
    }
}