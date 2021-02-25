const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0,
    result: []
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
        case 'STORE_RESULT' :
            return{
                ...state,
                result: state.result.concat({id: new Date(),value: state.counter})
            }
        case 'DELETE_RESULT' :
            const newArr = [...state.result];
            newArr.splice(id, 1); 
            return {
                ...state,
                result: newArr
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
store.dispatch({type: 'STORE_RESULT'});
store.dispatch({type: 'DEC_COUNTER'});
store.dispatch({type: 'SUB_COUNTER', value: 10});
store.dispatch({type: 'STORE_RESULT'});