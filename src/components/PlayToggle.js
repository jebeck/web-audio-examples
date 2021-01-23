import React from 'react';

import Button from '@material-ui/core/Button';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default function PlayToggle({ isCurrentlyPlaying, pause, play }) {
  return (
    <Button
      color="primary"
      onClick={() => {
        if (isCurrentlyPlaying) {
          pause();
        } else {
          play();
        }
      }}
      size="large"
      startIcon={isCurrentlyPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      style={{ minWidth: '15ch' }}
      variant="outlined"
    >
      {isCurrentlyPlaying ? 'pause' : 'play'}
    </Button>
  );
}
