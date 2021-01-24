import { Machine } from 'xstate';
import { localLog } from './actions.js';
import setUpRAFLoop from './services/setUpRAFLoop.js';
import './_rollupPluginBabelHelpers-f5b198ee.js';

function createTimeDomainDataMachine(_ref) {
  var analyser = _ref.analyser,
    el = _ref.el,
    Worker = _ref.Worker;
  console.log(analyser, el, Worker);
  return Machine(
    {
      context: {
        animationFrame: null,
        analyser: analyser,
        el: el,
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
        updateWorkerOptions: function updateWorkerOptions(_ref2, _ref3) {
          var worker = _ref2.worker;
          var workerOptions = _ref3.workerOptions;
          worker.postMessage({
            workerOptions: workerOptions,
          });
        },
      },
      services: {
        setUpRAFLoop: setUpRAFLoop,
      },
    }
  );
}

export default createTimeDomainDataMachine;
