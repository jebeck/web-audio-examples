import { assign, Machine } from 'xstate';

const keyboardMachine = Machine(
  {
    initial: 'initialized',
    context: { maxNotes: null, notes: [] },
    states: {
      initialized: {
        on: {
          UPDATE_MAX_NOTES: {
            actions: 'updateMaxNotes',
            target: 'initialized.inert',
          },
        },
        initial: 'inert',
        states: {
          inert: {
            on: {
              KEYDOWN: {
                actions: 'addNote',
                target: 'playing',
              },
            },
          },
          playing: {
            on: {
              KEYDOWN: {
                actions: 'addNote',
              },
              KEYUP: [
                {
                  actions: 'removeNote',
                  target: 'inert',
                  cond: 'notesEmpty',
                },
                {
                  actions: 'removeNote',
                  target: 'playing',
                  cond: 'notesRemaining',
                },
              ],
              RESET: {
                actions: 'removeAllNotes',
                target: 'inert',
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      addNote: assign({
        notes: (_, { value }) => {
          const newNotes = [..._.notes, value];
          if (newNotes.length > _.maxNotes) {
            newNotes.splice(0, newNotes.length - _.maxNotes);
          }
          return newNotes;
        },
      }),
      removeAllNotes: assign({ notes: () => [] }),
      removeNote: assign({
        notes: (_, { value }) => _.notes.filter((note) => note !== value),
      }),
      updateMaxNotes: assign({ maxNotes: (_, { value }) => value }),
    },
    guards: {
      notesEmpty: (_, { value }) =>
        _.notes.length === 1 && _.notes[0] === value,
      notesRemaining: (_) => _.notes.length > 1,
    },
  }
);

export default keyboardMachine;
