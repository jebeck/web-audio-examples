import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';

// import MiniSynthesizer from './MiniSynthesizer';
import UserAudioStream from './UserAudioStream';
import { Typography } from '@material-ui/core';

export const PAGES = [
  // {
  //   Component: MiniSynthesizer,
  //   path: '/synth',
  //   title: 'mini Web Audio synth',
  //   subtitle: 'virtual "knobs" for cool cats',
  // },
  {
    Component: UserAudioStream,
    path: '/user',
    title: 'the browser shows you your audio',
    subtitle: 'beware the feedback monster',
  },
];

const StyledLink = styled(Link)`
  :active,
  :focus,
  :visited {
    color: hotpink;
  }
`;

export default function Index({ headerBounds }) {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: `calc(100vh - ${headerBounds.bottom}px - 1rem)`,
        width: '65vw',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridGap: '1rem',
        }}
      >
        {PAGES.map(({ path, subtitle, title }) => (
          <StyledLink key={path} to={path}>
            <Box p={4}>
              <Typography color="primary" variant="h2">
                {title}
              </Typography>
              <Typography color="secondary" variant="h3">
                {subtitle}
              </Typography>
            </Box>
          </StyledLink>
        ))}
      </div>
    </div>
  );
}
