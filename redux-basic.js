const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}


//reducer
const rootReducer = (state = initialState, action) => {
   
    switch (action.type){
        case 'INC_COUNTER' : 
            return{
                ...state,
                counter: state.counter + 1
            }
        case 'ADD_COUNTER' :
            return{
                ...state,
                counter: state.counter + action.value
            }
        case 'DEC_COUNTER' :
            return{
                ...state,
                counter: state.counter - 1
            }
        case 'SUB_COUNTER' :
            return{
                ...state,
                counter: state.counter - action.value
            }
    }


    return state;
};

//store
const store = createStore(rootReducer);
console.log(store.getState());

//subscription
store.subscribe(() => {
    console.log(store.getState());
});

//dispatching action
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 20});
store.dispatch({type: 'DEC_COUNTER'});
store.dispatch({type: 'SUB_COUNTER'}, value: 10);

