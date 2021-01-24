/* eslint-disable import/no-anonymous-default-export */

import babel from 'rollup-plugin-babel';
import multi from 'rollup-plugin-multi-input';

export default {
  external: ['prop-types', 'react', 'xstate'],
  input: 'src/**/*.js',
  output: {
    format: 'esm',
    dir: 'dist/esm',
  },
  plugins: [multi(), babel()],
};
