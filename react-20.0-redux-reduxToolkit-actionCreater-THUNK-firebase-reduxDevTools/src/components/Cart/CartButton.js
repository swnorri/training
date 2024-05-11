import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice.js';

import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const cartQty = useSelector(state => {
    return state.cart.totalQty;
  });

  function handleToggleCart(){
    dispatch(uiActions.toggle());
  };

  return (
    <button onClick={handleToggleCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQty}</span>
    </button>
  );
};

export default CartButton;
