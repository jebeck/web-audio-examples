import { Machine, assign } from 'xstate';
import connectToAudioInput from './services/connectToAudioInput.js';

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
        updateCurrentlyPlaying: assign({
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

export default createWebAudioMachine;
