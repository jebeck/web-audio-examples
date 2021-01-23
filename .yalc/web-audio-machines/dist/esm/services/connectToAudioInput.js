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
                analyser = audioCtx.createAnalyser();
                target = destination || audioCtx.destination;
                analyser.connect(target);
                _context.prev = 5;
                _context.next = 8;
                return navigator.mediaDevices.getUserMedia({
                  audio: true,
                });

              case 8:
                userStream = _context.sent;
                stream = audioCtx.createMediaStreamSource(userStream);
                stream.connect(analyser);
                console.log('Hi there!');
                return _context.abrupt(
                  'return',
                  Promise.resolve({
                    name: 'userAudioAnalyser',
                    children: [
                      {
                        name: 'userAudio',
                      },
                    ],
                  })
                );

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](5);
                return _context.abrupt(
                  'return',
                  Promise.reject({
                    error: _context.t0,
                  })
                );

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[5, 15]]
      );
    })
  );
  return _connectToAudioInput.apply(this, arguments);
}

export default connectToAudioInput;
