import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import OpenInBrowserTwoToneIcon from '@material-ui/icons/OpenInBrowserTwoTone';
import { useTheme } from '@material-ui/core/styles';

import { Keyboard } from 'web-audio-hooks/dist/lib/index';

import PlayToggle from '../PlayToggle';

export default function KeyboardDrawer({
  notes,
  onKeydown,
  onKeyup,
  ...playControls
}) {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box
      bottom={0}
      boxShadow={3}
      left={0}
      p={2}
      position="fixed"
      style={{
        backgroundColor: theme?.palette?.background?.default,
      }}
    >
      <Box display="flex">
        <PlayToggle {...playControls} />
        <Box ml={2}>
          <Button
            color="secondary"
            onClick={() => setDrawerOpen(!drawerOpen)}
            size="large"
            startIcon={<OpenInBrowserTwoToneIcon />}
            variant="outlined"
          >
            open keyboard
          </Button>
        </Box>
      </Box>
      <Drawer
        anchor="bottom"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <Box display="flex" p={2} width="100%">
          <PlayToggle {...playControls} />
        </Box>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Keyboard onKeydown={onKeydown} onKeyup={onKeyup} notes={notes} />
        </Box>
      </Drawer>
    </Box>
  );
}
