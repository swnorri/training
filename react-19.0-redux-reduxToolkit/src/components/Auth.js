import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth.js';

import classes from './Auth.module.css';


const Auth = () => {

  const dispatch = useDispatch();

  function handleSubmit(e){
    e.preventDefault();
    dispatch(authActions.LOGIN());
  }


  return (
    <main className={classes.auth} onSubmit={handleSubmit}>
      <section>
        <form>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
