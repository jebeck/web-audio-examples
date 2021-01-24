import { Machine } from 'xstate';

import { localLog } from './actions';
import { setUpRAFLoop } from './services/index';

export default function createTimeDomainDataMachine({ analyser, el, Worker }) {
  console.log(analyser, el, Worker);
  return Machine(
    {
      context: {
        animationFrame: null,
        analyser,
        el,
        worker: new Worker(),
      },
      id: 'timeDomainDataMachine',
      initial: 'uninitialized',
      states: {
        on: {
          UPDATE_WORKER_OPTIONS: {
            actions: ['log', 'updateWorkerOptions'],
          },
        },
        error: {},
        uninitialized: {
          invoke: {
            id: 'setUpRAFLoop',
            src: 'setUpRAFLoop',
            onDone: {
              actions: ['log'],
              target: 'initialized',
            },
            onError: {
              actions: ['log'],
              target: 'error',
            },
          },
        },
        initialized: {},
      },
    },
    {
      actions: {
        log: localLog,
        updateWorkerOptions: ({ worker }, { workerOptions }) => {
          worker.postMessage({ workerOptions });
        },
      },
      services: {
        setUpRAFLoop,
      },
    }
  );
}
