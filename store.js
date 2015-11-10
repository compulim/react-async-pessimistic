!function () {
    'use strict';

    var {Redux, reducers} = window,
        {todos} = reducers;

    window.store = 
        Redux.applyMiddleware(
            window.ReduxPromiseMiddleware()
        )(
            Redux.createStore
        )(
            Redux.combineReducers({
                todos
            })
        );
}();