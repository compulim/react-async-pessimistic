!function () {
    'use strict';

    var {api} = window,
        PENDING_SUFFIX = '_PENDING',
        FULFILLED_SUFFIX = '_FULFILLED',
        REJECTED_SUFFIX = '_REJECTED',
        SAVE_TODO = 'SAVE_TODO',
        SAVE_TODO_PENDING = SAVE_TODO + PENDING_SUFFIX,
        SAVE_TODO_FULFILLED = SAVE_TODO + FULFILLED_SUFFIX,
        SAVE_TODO_REJECTED = SAVE_TODO + REJECTED_SUFFIX;

    function saveTodo(index, todo) {
        return {
            type: SAVE_TODO,
            payload: {
                data: {index, todo},
                promise: api.saveTodo(index, todo).then(() => ({index, todo}))
            }
        };
    }

    window.Actions = {
        SAVE_TODO_PENDING,
        SAVE_TODO_FULFILLED,
        SAVE_TODO_REJECTED,
        saveTodo
    };
}();