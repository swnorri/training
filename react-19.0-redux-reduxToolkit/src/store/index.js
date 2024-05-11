import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './counter';
import authSlice from './auth';

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: authSlice.reducer
    }
});

export default store;



//import { createStore } from 'redux';

// const store = createStore((
//     state = {
//         counter: 0,
//         showCounter: true
//     },
//     action
// ) => {
//     const cloneObj = { ...state };

//     switch (action.type) {
//         case 'INCREMENT': {
//             cloneObj.counter = cloneObj.counter + 1;
//             break;
//         }
//         case 'DECREMENT': {
//             cloneObj.counter = cloneObj.counter - 1;
//             break;
//         }
//         case 'INCREMENTBYX': {
//             cloneObj.counter = cloneObj.counter + action.payload.amount;
//             break;
//         }
//         case 'TOGGLECOUNTER': {
//             cloneObj.showCounter = !cloneObj.showCounter;
//             break;
//         }
//     }
//     return cloneObj;
// });

// export default store;