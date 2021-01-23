import { assign, Machine } from 'xstate';

import { connectToAudioInput } from './services/index';

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
        audioCtx,
        graph: { name: 'audioCtx', children: [] },
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
          isCurrentlyPlaying: ({ audioCtx }) =>
            AUDIO_CTX_STATES_TO_CURRENTLY_PLAYING?.[audioCtx?.state],
        }),
      },
      services: {
        connectToAudioInput,
        resume: ({ audioCtx }) => audioCtx.resume(),
        suspend: ({ audioCtx }) => audioCtx.suspend(),
      },
    }
  );
}
