(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports, require('xstate'))
    : typeof define === 'function' && define.amd
    ? define(['exports', 'xstate'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global.webAudioMachines = {}), global.xstate));
})(this, function (exports, xstate) {
  'use strict';

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
          asyncGeneratorStep(
            gen,
            resolve,
            reject,
            _next,
            _throw,
            'next',
            value
          );
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

  var AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING = {
    closed: false,
    running: true,
    suspended: false,
  };
  function createWebAudioMachine() {
    var audioCtx = new AudioContext();
    return xstate.Machine(
      {
        context: {
          audioCtx: audioCtx,
          graph: {
            name: 'audioCtx',
            children: [],
          },
          isCurrentlyPlaying:
            AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING === null ||
            AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING === void 0
              ? void 0
              : AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING[audioCtx.state],
        },
        id: 'WebAudioMachine',
        initial: 'base',
        states: {
          base: {
            on: {
              CONNECT_TO_AUDIO_INPUT: {
                target: 'connectingToAudioInput',
              },
              PAUSE: {
                target: 'suspending',
              },
              PLAY: {
                target: 'resuming',
              },
            },
          },
          connectingToAudioInput: {
            invoke: {
              id: 'connectToAudioInput',
              src: 'connectToAudioInput',
              onDone: {
                target: 'base',
              },
            },
          },
          resuming: {
            invoke: {
              id: 'resume',
              src: 'resume',
              onDone: {
                actions: 'updateCurrentlyPlaying',
                target: 'base',
              },
            },
          },
          suspending: {
            invoke: {
              id: 'suspend',
              src: 'suspend',
              onDone: {
                actions: 'updateCurrentlyPlaying',
                target: 'base',
              },
            },
          },
        },
      },
      {
        actions: {
          updateCurrentlyPlaying: xstate.assign({
            isCurrentlyPlaying: function isCurrentlyPlaying(_ref) {
              var audioCtx = _ref.audioCtx;
              return AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING === null ||
                AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING === void 0
                ? void 0
                : AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING[
                    audioCtx === null || audioCtx === void 0
                      ? void 0
                      : audioCtx.state
                  ];
            },
          }),
        },
        services: {
          connectToAudioInput: connectToAudioInput,
          resume: function resume(_ref2) {
            var audioCtx = _ref2.audioCtx;
            return audioCtx.resume();
          },
          suspend: function suspend(_ref3) {
            var audioCtx = _ref3.audioCtx;
            return audioCtx.suspend();
          },
        },
      }
    );
  }

  exports.createWebAudioMachine = createWebAudioMachine;

  Object.defineProperty(exports, '__esModule', { value: true });
});
