function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }

      _next(undefined);
    });
  };
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

/** could consider an option to *not* include analyser via event data */
function connectToAudioInput(_x, _x2) {
  return _connectToAudioInput.apply(this, arguments);
}

function _connectToAudioInput() {
  _connectToAudioInput = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref, _ref2) {
      var audioCtx, destination, analyser, target, userStream, stream;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                audioCtx = _ref.audioCtx;
                destination = _ref2.destination;
                analyser = audioCtx.node.createAnalyser();
                target = destination || audioCtx.node.destination;
                analyser.connect(target);
                _context.prev = 5;
                _context.next = 8;
                return navigator.mediaDevices.getUserMedia({
                  audio: true,
                });

              case 8:
                userStream = _context.sent;
                stream = audioCtx.node.createMediaStreamSource(userStream);
                stream.connect(analyser);
                return _context.abrupt(
                  'return',
                  Promise.resolve({
                    name: 'userAudioAnalyser',
                    node: analyser,
                    type: 'AnalyserNode',
                    children: [
                      {
                        name: 'userAudio',
                        node: stream,
                        type: 'MediaStreamAudioSourceNode',
                        children: [],
                      },
                    ],
                  })
                );

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](5);
                return _context.abrupt(
                  'return',
                  Promise.reject({
                    error: _context.t0,
                  })
                );

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[5, 14]]
      );
    })
  );
  return _connectToAudioInput.apply(this, arguments);
}

export { _toConsumableArray as _, connectToAudioInput as c };
