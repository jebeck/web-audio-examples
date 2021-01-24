import { actions } from 'xstate';
const { log } = actions;

export const localLog =
  process.env.NODE_ENV === 'development' ? log() : () => {};
