!function () {
    'use strict';

    var {Actions, Immutable} = window,
        {fromJS, List, Map} = Immutable;

    const DEFAULT_LIST = [
        'Buy milk',
        'Buy eggs'
    ];

    window.reducers = {
        todos: function todos(state = List(DEFAULT_LIST), action) {
            var {payload} = action;

            switch (action.type) {
            case Actions.SAVE_TODO_FULFILLED:
                return state.set(payload.index, payload.todo);

            default:
                return state;
            }
        }
    };
}();
