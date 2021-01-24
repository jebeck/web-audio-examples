import React, { useEffect, useReducer, useState } from 'react';
import { useMachine } from '@xstate/react';

import { AddIcon, Box, Button, Typography } from '@material-ui/core';

import { actions, initialState, synthReducer } from '../synthReducer';
import KeyboardDrawer from '../components/synth/KeyboardDrawer';
import keyboardMachine from '../keyboardMachine';
import Layout from '../components/Layout';
import Voice from '../components/synth/Voice';

export default function MiniSynthesizer({ headerBounds }) {
  const [isPlaying, setPlaying] = useState(false);
  const [synthState, dispatch] = useReducer(synthReducer, initialState);

  const { voices } = synthState;
  const [keyboardState, send] = useMachine(keyboardMachine, {
    devTools: true,
  });

  useEffect(() => {
    send({ type: 'UPDATE_MAX_NOTES', value: voices?.length });
  }, [send, voices]);

  return (
    <Layout headerBounds={headerBounds}>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        margin="0 auto"
        minHeight="inherit"
        position="relative"
        width="75%"
      >
        <Typography
          color="secondary"
          variant="h2"
          style={{ alignSelf: 'flex-start' }}
        >
          sculpt a sound
        </Typography>
        {voices
          ? voices.map((props, idx) => (
              <Voice
                dispatch={dispatch}
                idx={idx}
                isPlaying={isPlaying}
                key={props.id}
                note={keyboardState?.context?.notes?.[idx]}
                playing={isPlaying}
                {...props}
              />
            ))
          : null}
        <Box alignSelf="flex-end" p={4}>
          <Button
            color="primary"
            onClick={() => {
              dispatch(actions.addVoice());
            }}
            size="large"
            startIcon={<AddIcon />}
            variant="contained"
          >
            voice
          </Button>
        </Box>
        <KeyboardDrawer
          isCurrentlyPlaying={isPlaying}
          notes={keyboardState?.context?.notes}
          onKeydown={(note) => {
            send({ type: 'KEYDOWN', value: note });
          }}
          onKeyup={(note) => {
            send({ type: 'KEYUP', value: note });
          }}
          pause={() => setPlaying(false)}
          play={() => setPlaying(true)}
        />
      </Box>
    </Layout>
  );
}
