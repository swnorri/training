import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification.js';

import { sendCartData, fetchCartData } from './store/cart-actions.js';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => {
    return state.ui.cartIsVisible;
  });
  const cart = useSelector(state => {
    return state.cart;
  });
  const notificationStatus = useSelector(state => {
    return state.ui.notification;
  });

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  // cart.initialize for actual runs of cart
  // from cart-slice addItemToCart, delItemFmCart
  // have to run the above to allow sendCartData
  useEffect(() => {
    if (cart.initialize){
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {
        notificationStatus && <Notification {...notificationStatus} />
      }
      <Layout>
        {
          showCart && <Cart />
        }
        {
          !showCart && <Products />
        }
      </Layout>
    </>
  );
}

export default App;
