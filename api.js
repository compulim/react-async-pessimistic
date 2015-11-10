!function () {
    'use strict';

    var {Q} = window;

    window.api = {
        saveTodo: function (index, todo) {
            var deferred = Q.defer();

            setTimeout(() => deferred.resolve(), 1000);

            return deferred.promise;
        }
    };
}();