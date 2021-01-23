import React, { useMemo } from 'react';
import { Router } from '@reach/router';
import useMeasure from 'react-use-measure';

import Box from '@material-ui/core/Box';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Index, { PAGES } from './pages/Index';

export default function App() {
  const [headerRef, headerBounds] = useMeasure();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // const prefersDarkMode = false;

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          background: {
            default: prefersDarkMode ? '#023660' : '#F8F8FF',
          },
          primary: { main: '#FF1493' }, // DeepPink
          secondary: { main: '#00CED1' }, // DarkTurquoise
        },
        typography: {
          fontFamily: 'dm',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <Box boxShadow={1} boxSizing="border-box" p={4} ref={headerRef}>
        <Typography
          color="secondary"
          style={{
            fontStyle: 'italic',
            fontWeight: 'bold',
            marginTop: '-0.5rem',
            textAlign: 'right',
            textDecoration: `${
              theme.palette.primary[prefersDarkMode ? 'dark' : 'light']
            } double underline`,
          }}
          variant="h1"
        >
          using web audio machines
        </Typography>
      </Box>
      <CssBaseline />
      <Router>
        <Index default headerBounds={headerBounds} />
        {PAGES.map(({ Component, path }) => (
          <Component headerBounds={headerBounds} key={path} path={path} />
        ))}
      </Router>
    </MuiThemeProvider>
  );
}
