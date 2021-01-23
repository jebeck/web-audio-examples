import {
  createActionCreators,
  createReducerFunction,
  ImmerReducer,
} from 'immer-reducer';
import { v4 as id } from 'uuid';

import { getFilterDefaultsByType } from 'web-audio-hooks';

function makeFilter() {
  return {
    type: null,
  };
}

function makeOscillator() {
  return {
    gain: undefined,
    id: id(),
    waveform: undefined,
  };
}

function makeVoice() {
  return {
    delay: { delayTime: 0 },
    filter: makeFilter(),
    id: id(),
    oscillators: [makeOscillator()],
  };
}

export const initialState = {
  voices: [makeVoice()],
};

class SynthReducer extends ImmerReducer {
  addFilter(voiceIdx, type) {
    this.draftState.voices[voiceIdx].filter = Object.assign(
      {},
      { type },
      getFilterDefaultsByType(type)
    );
  }
  addOscillator(voiceIdx) {
    this.draftState.voices[voiceIdx].oscillators.push(makeOscillator());
  }
  addVoice() {
    this.draftState.voices.push(makeVoice());
  }
  editDelay(voiceIdx, delayTime) {
    this.draftState.voices[voiceIdx].delay.delayTime = delayTime;
  }
  editFilter(voiceIdx, key, val) {
    this.draftState.voices[voiceIdx].filter[key] = val;
  }
  editOscillator(voiceIdx, oscIdx, key, val) {
    this.draftState.voices[voiceIdx].oscillators[oscIdx][key] = val;
  }
  removeFilter(voiceIdx) {
    this.draftState.voices[voiceIdx].filter = makeFilter();
  }
  removeOscillator(voiceIdx, oscIdx) {
    if (this.draftState.voices[voiceIdx].length > 1) {
      this.draftState.voices[voiceIdx].oscillators.splice(oscIdx, 1);
    }
  }
  removeVoice(voiceIdx) {
    if (this.draftState.voices.length > 1) {
      this.draftState.voices.splice(voiceIdx, 1);
    }
  }
}

export const actions = createActionCreators(SynthReducer);
export const synthReducer = createReducerFunction(SynthReducer);
