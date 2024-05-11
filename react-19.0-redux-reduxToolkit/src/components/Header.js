import classes from './Header.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth.js';

const Header = () => {
  const dispatch = useDispatch();

  function handleLogout(){
    dispatch(authActions.LOGOUT());
  }
  const isAuth = useSelector(state => {
    return state.auth.isAuthed;
  });


  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {
        isAuth && (
          <nav>
            <ul>
              <li>
                <a href='/'>My Products</a>
              </li>
              <li>
                <a href='/'>My Sales</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </nav>
        )
      }
    </header>
  );
};

export default Header;
