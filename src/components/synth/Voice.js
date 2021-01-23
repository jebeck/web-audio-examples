import React, { useEffect } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';

import { Oscilloscope } from 'web-audio-hooks/dist/lib/index';
import {
  useAnalyser,
  useAudioContext,
  useDelay,
  useFilter,
} from 'web-audio-hooks';

import { actions } from '../../synthReducer';
import FilterOptions from './FilterOptions';
import Oscillator from './Oscillator';
import { TextField } from '@material-ui/core';

export default function Voice({
  delay,
  dispatch,
  filter,
  idx,
  isPlaying,
  note,
  oscillators,
}) {
  const { audioCtx, isCurrentlyPlaying, pause, play } = useAudioContext();
  const { analyserNode } = useAnalyser({ audioCtx });
  const { delayNode } = useDelay({
    audioCtx,
    destination: analyserNode,
    ...delay,
  });
  const { filterNode } = useFilter({
    audioCtx,
    destination: delayNode,
    ...filter,
  });

  useEffect(() => {
    if (isPlaying && !isCurrentlyPlaying) {
      play();
    } else if (!isPlaying && isCurrentlyPlaying) {
      pause();
    }
  }, [isCurrentlyPlaying, isPlaying, pause, play]);

  return (
    <Box boxShadow={1} display="flex" mt={2} p={2}>
      <Box p={2}>
        <Oscilloscope absolute={false} analyser={analyserNode} />
      </Box>
      <Box>
        <Typography
          color="primary"
          style={{ fontSize: '1.5rem', fontStyle: 'italic' }}
        >{`voice #${idx + 1}`}</Typography>
        <Box
          alignItems="baseline"
          display="flex"
          flexWrap="wrap"
          maxWidth="1200px"
        >
          {oscillators.map(({ frequency, gain, id, waveform }, j) => (
            <Oscillator
              audioCtx={audioCtx}
              destination={filterNode || delayNode || analyserNode}
              dispatch={dispatch}
              frequency={frequency}
              gain={gain}
              idx={j}
              key={id}
              note={note}
              voiceIdx={idx}
              waveform={waveform}
            />
          ))}

          <Box display="flex" flexDirection="column">
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">seconds</InputAdornment>
                ),
              }}
              helperText="add delay"
              label="delay"
              onChange={(e) => {
                dispatch(actions.editDelay(idx, e?.target?.value));
              }}
              size="small"
              type="number"
              value={delay?.delayTime || 0}
              variant="outlined"
            />
            <FilterOptions
              dispatch={dispatch}
              filterNode={filterNode}
              filterState={filter}
              voiceIdx={idx}
            />
          </Box>
          <div>
            <Button
              color="secondary"
              onClick={() => dispatch(actions.addOscillator(idx))}
              startIcon={<AddIcon />}
              variant="outlined"
            >
              oscillator
            </Button>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
