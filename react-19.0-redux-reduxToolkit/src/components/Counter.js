import classes from './Counter.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counter.js';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => {
    return state.counter.counter;
  });
  const counterDisplay = useSelector(state => {
    return state.counter.showCounter;
  });
  
  
  // all the commented out code is for basic redux, not sliced redux


  function toggleCounterHandler() {
    // dispatch({
    //   type: 'TOGGLECOUNTER'
    // });
    dispatch(counterActions.TOGGLECOUNTER());
  };
  function handleIncrement() {
    // dispatch({
    //   type: 'INCREMENT'
    // });
    dispatch(counterActions.INCREMENT());
  };
  function handleIncrementByX(num = 1) {
    // dispatch({
    //   type: 'INCREMENTBYX',
    //   payload: {
    //     amount: num
    //   }
    // });
    dispatch(counterActions.INCREMENTBYX({
      amount : num
    }));
  };
  function handleDecrement() {
    // dispatch({
    //   type: 'DECREMENT'
    // });
    dispatch(counterActions.DECREMENT());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {
        counterDisplay &&
        <div className={classes.value}>{counter}</div>
      }
      <div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={() => handleIncrementByX(5)}>Increase by 5</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
