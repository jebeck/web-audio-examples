import React, { Fragment, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { useTimeDomainData } from '../../src/index';

import OscilloscopeWorker from '../workers/Oscilloscope.worker';

function Oscilloscope({ analyser, canvasRef, workerOptions }) {
  useTimeDomainData({
    analyser,
    canvasRef,
    Worker: OscilloscopeWorker,
    workerOptions,
  });

  return null;
}

Oscilloscope.propTypes = {
  analyser: PropTypes.object.isRequired,
  canvasRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
  workerOptions: PropTypes.shape({
    bg: PropTypes.string.isRequired,
    stroke: PropTypes.string.isRequired,
  }).isRequired,
};

function OscilloscopeContainer(props) {
  const {
    absolute,
    analyser,
    bg,
    height = 180,
    position,
    stroke,
    width = 320,
  } = props;
  const canvasRef = useRef();
  const workerOptions = useMemo(() => ({ bg, stroke }), [bg, stroke]);

  return (
    <Fragment>
      <canvas
        height={height}
        ref={canvasRef}
        width={width}
        style={{
          maxHeight: height,
          maxWidth: width,
          position: absolute ? 'absolute' : 'relative',
          ...position,
        }}
      />
      <Oscilloscope
        analyser={analyser}
        canvasRef={canvasRef}
        workerOptions={workerOptions}
      />
    </Fragment>
  );
}

OscilloscopeContainer.defaultProps = {
  absolute: true,
  bg: 'AliceBlue',
  stroke: 'Grey',
};

OscilloscopeContainer.propTypes = {
  absolute: PropTypes.bool.isRequired,
  analyser: PropTypes.object.isRequired,
  bg: PropTypes.string.isRequired,
  height: PropTypes.number,
  position: PropTypes.shape({
    top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  stroke: PropTypes.string.isRequired,
  width: PropTypes.number,
};

export default OscilloscopeContainer;
