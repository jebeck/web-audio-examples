import React from 'react';
import teoria from 'teoria';

import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';

import { useGain, useOscillator } from 'web-audio-hooks';

import { actions } from '../../synthReducer';
import { Typography } from '@material-ui/core';

const WAVEFORMS = ['sine', 'square', 'sawtooth', 'triangle'];

export default function Oscillator({
  audioCtx,
  destination,
  dispatch,
  frequency,
  gain = 0.25,
  idx,
  note,
  voiceIdx,
  waveform,
}) {
  const { gainNode } = useGain({ audioCtx, destination, gain });
  useOscillator({
    audioCtx,
    destination: gainNode,
    frequency: note ? teoria.note.fromString(note).fq() : undefined,
    /** this weirdness of passing {} or undefined is in lieu of a proper envelope rn */
    note: note ? {} : undefined,
    type: waveform,
  });

  return (
    <Box display="flex" flexDirection="column">
      <Typography
        color="secondary"
        style={{ fontStyle: 'italic' }}
      >{`oscillator #${idx + 1}`}</Typography>
      <Box display="flex" justifyContent="space-around" m={4} width="50ch">
        <TextField
          label="waveform"
          onChange={(e) => {
            dispatch(
              actions.editOscillator(
                voiceIdx,
                idx,
                'waveform',
                e?.target?.value
              )
            );
          }}
          select
          style={{ width: '20ch' }}
          value={waveform || 'sine'}
        >
          {WAVEFORMS.map((wf) => (
            <MenuItem key={wf} value={wf}>
              {wf}
            </MenuItem>
          ))}
        </TextField>
        <Box display="flex" flexDirection="column">
          <Typography gutterBottom>gain</Typography>
          <Slider
            marks
            max={1}
            min={0}
            onChange={(e, value) => {
              dispatch(actions.editOscillator(voiceIdx, idx, 'gain', value));
            }}
            step={0.1}
            style={{ width: '20ch' }}
            value={gain}
          />
        </Box>
      </Box>
    </Box>
  );
}
