import { a as _asyncToGenerator } from '../_rollupPluginBabelHelpers-f5b198ee.js';

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

export default connectToAudioInput;
