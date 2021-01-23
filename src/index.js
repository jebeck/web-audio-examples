import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { inspect } from '@xstate/inspect';

import './dank-mono.css';
import './index.css';

inspect({
  iframe: false,
});

ReactDOM.render(<App />, document.getElementById('root'));
