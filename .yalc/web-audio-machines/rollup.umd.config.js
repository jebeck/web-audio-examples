import babel from 'rollup-plugin-babel';

import baseConfig from './rollup.config';

export default {
  external: baseConfig.external,
  input: 'src/index.js',
  output: {
    file: 'dist/web-audio-machines.js',
    format: 'umd',
    globals: {
      'prop-types': 'prop-types',
      react: 'react',
      xstate: 'xstate',
    },
    name: 'webAudioMachines',
  },
  plugins: [babel()],
};
