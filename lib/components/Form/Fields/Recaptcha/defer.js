export default function () {
  var state = false; // Resolved or not

  var callbacks = [];

  var resolve = function resolve() {
    console.log('🚀 ~ file: defer.js ~ line 8 ~ resolve ~ state', state, callbacks);
    if (state) {
      return;
    }

    state = true;

    for (var i = 0, len = callbacks.length; i < len; i++) {
      callbacks[i]();
    }
  };

  var then = function then(cb) {
    console.log('🚀 ~ file: defer.js ~ line 20 ~ then ~ state', state);
    if (!state) {
      callbacks.push(cb);
      return;
    }

    cb();
  };

  var deferred = {
    resolved: function resolved() {
      return state;
    },
    resolve: resolve,
    promise: {
      then: then,
    },
  };
  return deferred;
}
