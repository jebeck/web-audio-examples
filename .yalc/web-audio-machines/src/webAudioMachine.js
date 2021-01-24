import { assign, Machine } from 'xstate';

import { connectToAudioInput } from './services/index';
import { localLog } from './actions';

const AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING = {
  closed: false,
  running: true,
  suspended: false,
};

export default function createWebAudioMachine() {
  const audioCtx = new AudioContext();

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
          AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING?.[audioCtx.state],
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
          audioCtx: ({ audioCtx }, evt) => {
            audioCtx.children = [...audioCtx.children, evt.data];
            return audioCtx;
          },
        }),
        log: localLog,
        updateCurrentlyPlaying: assign({
          isCurrentlyPlaying: ({ audioCtx }) =>
            AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING?.[audioCtx.node.state],
        }),
      },
      services: {
        connectToAudioInput,
        resume: ({ audioCtx }) => audioCtx.node.resume(),
        suspend: ({ audioCtx }) => audioCtx.node.suspend(),
      },
    }
  );
}
