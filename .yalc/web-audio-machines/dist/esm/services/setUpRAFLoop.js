import { a as _asyncToGenerator } from '../_rollupPluginBabelHelpers-f5b198ee.js';

function setUpRAFLoop(_x) {
  return _setUpRAFLoop.apply(this, arguments);
}

function _setUpRAFLoop() {
  _setUpRAFLoop = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref) {
      var analyser, el, worker, rafLoop, offscreenCanvas;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                rafLoop = function _rafLoop() {
                  requestAnimationFrame(rafLoop);
                  var buffer = new ArrayBuffer(analyser.frequencyBinCount);
                  var dataArray = new Uint8Array(buffer);
                  analyser.getByteTimeDomainData(dataArray);
                  worker.postMessage(
                    {
                      timeDomainData: buffer,
                    },
                    [buffer]
                  );
                };

                (analyser = _ref.analyser),
                  _ref.animationFrame,
                  (el = _ref.el),
                  (worker = _ref.worker);
                _context.prev = 2;
                offscreenCanvas = el.transferControlToOffscreen();
                worker.postMessage(
                  {
                    canvas: offscreenCanvas,
                  },
                  [offscreenCanvas]
                );
                rafLoop();
                return _context.abrupt('return', Promise.resolve());

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);
                return _context.abrupt(
                  'return',
                  Promise.reject({
                    error: _context.t0,
                  })
                );

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[2, 9]]
      );
    })
  );
  return _setUpRAFLoop.apply(this, arguments);
}

export default setUpRAFLoop;
