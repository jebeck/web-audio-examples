import { _ as _toConsumableArray } from './_rollupPluginBabelHelpers-f5b198ee.js';
import { Machine, assign } from 'xstate';
import connectToAudioInput from './services/connectToAudioInput.js';
import { localLog } from './actions.js';

var AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING = {
  closed: false,
  running: true,
  suspended: false,
};
function createWebAudioMachine() {
  var audioCtx = new AudioContext();
  return Machine(
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
        addAudioGraphChild: assign({
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
        updateCurrentlyPlaying: assign({
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

export default createWebAudioMachine;
