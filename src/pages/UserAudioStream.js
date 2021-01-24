import React, { useCallback, useEffect, useMemo } from 'react';
import { useMachine } from '@xstate/react';

import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { Oscilloscope } from 'web-audio-machines/dist/lib/';

import { createWebAudioMachine } from 'web-audio-machines';

import Layout from '../components/Layout';
import PlayToggle from '../components/PlayToggle';

const webAudioMachine = createWebAudioMachine();

export default function UserAudioStream({ headerBounds }) {
  const [state, send] = useMachine(webAudioMachine, { devTools: true });
  const theme = useTheme();

  useEffect(() => {
    send('CONNECT_TO_AUDIO_INPUT');
  }, [send]);

  const pause = useCallback(() => {
    send('PAUSE');
  }, [send]);
  const play = useCallback(() => {
    send('PLAY');
  }, [send]);

  const analyserNode = useMemo(() => {
    const children = state?.context?.audioCtx?.children;
    if (children?.length) {
      const analyser = children.find(({ type }) => type === 'AnalyserNode');
      return analyser.node;
    }
  }, [state.context.audioCtx.children]);

  return (
    <Layout headerBounds={headerBounds}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        margin="0 auto"
        position="relative"
        width="66.66666667%"
      >
        <Typography color="secondary" variant="h2">
          view your computer's audio stream in an oscilloscope
        </Typography>
        <div>
          <PlayToggle
            isCurrentlyPlaying={state?.context?.isCurrentlyPlaying}
            pause={pause}
            play={play}
          />
        </div>
        {analyserNode && (
          <div style={{ alignSelf: 'flex-end' }}>
            <Oscilloscope
              absolute={false}
              analyser={analyserNode}
              bg={theme.palette.type === 'dark' ? '#424242' : 'AliceBlue'}
              height={360}
              stroke={theme.palette.primary.main}
              width={640}
            />
          </div>
        )}
        <Box mt={8}>
          <Typography color="primary" variant="h6">
            (if using mic input, beware of feedback!)
          </Typography>
        </Box>
        <Typography color="secondary">
          if signal display is not covering much of the y-axis, check your input
          gain(s)
        </Typography>
      </Box>
    </Layout>
  );
}
