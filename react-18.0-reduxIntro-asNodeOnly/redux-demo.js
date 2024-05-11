
const redux = require('redux');

const counterReducer = (state = { counter : 0 }, action) => {
    switch(action.type){
        case 'INCREMENT':{
            return {
                counter: state.counter + 1
            }
            break;
        }
        case 'DECREMENT':{
            return {
                counter: state.counter - 1
            }
            break
        }
    }

    return state;
};

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
    const latestState = store.getState();

    console.log(latestState);
}

store.subscribe(counterSubscriber);

store.dispatch({
    type : 'INCREMENT'
});
store.dispatch({
    type : 'DECREMENT'
});