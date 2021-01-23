import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// import { Oscilloscope } from 'web-audio-machines/dist/lib/index';
// import { useAudioContext, useAudioStream, useAnalyser } from 'web-audio-hooks';

import { createWebAudioMachine } from 'web-audio-machines';

import Layout from '../components/Layout';
// import PlayToggle from '../components/PlayToggle';

const webAudioMachine = createWebAudioMachine();

export default function UserAudioStream({ headerBounds }) {
  // const { audioCtx, ...ctxControls } = useAudioContext();
  // const { analyserNode } = useAnalyser({ audioCtx });
  // useAudioStream({ audioCtx, destination: analyserNode });

  const [state, send] = useMachine(webAudioMachine, { devTools: true });
  // console.log(state);

  useEffect(() => {
    send('CONNECT_TO_AUDIO_INPUT');
  }, [send]);

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
        {/* <div>
          <PlayToggle {...ctxControls} />
        </div> */}
        <div style={{ alignSelf: 'flex-end' }}>
          {/* <Oscilloscope
            absolute={false}
            analyser={analyserNode}
            height={360}
            position={{ right: '1rem', top: '1rem' }}
            width={640}
          /> */}
        </div>
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
