(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports, require('xstate'), require('react'))
    : typeof define === 'function' && define.amd
    ? define(['exports', 'xstate', 'react'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global.webAudioMachines = {}), global.xstate, global.react));
})(this, function (exports, xstate, react) {
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

  var log = xstate.actions.log;
  var localLog =
    process.env.NODE_ENV === 'development' ? log() : function () {};

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
          audioCtx: {
            name: 'audioCtx',
            node: audioCtx,
            type: 'AudioContext',
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
          error: {},
          connectingToAudioInput: {
            invoke: {
              id: 'connectToAudioInput',
              src: 'connectToAudioInput',
              onDone: {
                actions: ['log', 'addAudioGraphChild'],
                target: 'base',
              },
              onError: {
                target: 'error',
              },
            },
          },
          resuming: {
            invoke: {
              id: 'resume',
              src: 'resume',
              onDone: {
                actions: ['log', 'updateCurrentlyPlaying'],
                target: 'base',
              },
            },
          },
          suspending: {
            invoke: {
              id: 'suspend',
              src: 'suspend',
              onDone: {
                actions: ['log', 'updateCurrentlyPlaying'],
                target: 'base',
              },
            },
          },
        },
      },
      {
        actions: {
          addAudioGraphChild: xstate.assign({
            audioCtx: function audioCtx(_ref, evt) {
              var _audioCtx = _ref.audioCtx;
              _audioCtx.children = [].concat(
                _toConsumableArray(_audioCtx.children),
                [evt.data]
              );
              return _audioCtx;
            },
          }),
          log: localLog,
          updateCurrentlyPlaying: xstate.assign({
            isCurrentlyPlaying: function isCurrentlyPlaying(_ref2) {
              var audioCtx = _ref2.audioCtx;
              return AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING === null ||
                AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING === void 0
                ? void 0
                : AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING[audioCtx.node.state];
            },
          }),
        },
        services: {
          connectToAudioInput: connectToAudioInput,
          resume: function resume(_ref3) {
            var audioCtx = _ref3.audioCtx;
            return audioCtx.node.resume();
          },
          suspend: function suspend(_ref4) {
            var audioCtx = _ref4.audioCtx;
            return audioCtx.node.suspend();
          },
        },
      }
    );
  }

  function useTimeDomainData(_ref) {
    var analyser = _ref.analyser,
      canvasRef = _ref.canvasRef,
      Worker = _ref.Worker,
      workerOptions = _ref.workerOptions;
    console.log(workerOptions);
    var animationFrameRef = react.useRef();
    var workerRef = react.useRef();

    function getWorker() {
      if (!workerRef.current) {
        workerRef.current = new Worker();
      }

      return workerRef.current;
    }

    function rafLoop() {
      animationFrameRef.current = requestAnimationFrame(rafLoop);
      var buffer = new ArrayBuffer(analyser.frequencyBinCount);
      var dataArray = new Uint8Array(buffer);
      analyser.getByteTimeDomainData(dataArray);
      getWorker().postMessage(
        {
          timeDomainData: buffer,
        },
        [buffer]
      );
    }

    react.useEffect(function () {
      if (canvasRef !== null && canvasRef !== void 0 && canvasRef.current) {
        console.log('transfer canvas to Worker + start rAF loop');
        var worker = getWorker();
        var offscreenCanvas = canvasRef.current.transferControlToOffscreen();
        worker.postMessage(
          {
            canvas: offscreenCanvas,
          },
          [offscreenCanvas]
        );
        rafLoop();
        var animationFrame = animationFrameRef.current;
        return function () {
          cancelAnimationFrame(animationFrame);
        };
      } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    react.useEffect(
      function () {
        var worker = getWorker();
        worker.postMessage({
          workerOptions: workerOptions,
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
      },
      [workerOptions]
    );
  }

  exports.createWebAudioMachine = createWebAudioMachine;
  exports.useTimeDomainData = useTimeDomainData;

  Object.defineProperty(exports, '__esModule', { value: true });
});
