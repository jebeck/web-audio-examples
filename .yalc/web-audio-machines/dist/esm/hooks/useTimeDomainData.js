import { useRef, useEffect } from 'react';

function useTimeDomainData(_ref) {
  var analyser = _ref.analyser,
    canvasRef = _ref.canvasRef,
    Worker = _ref.Worker,
    workerOptions = _ref.workerOptions;
  console.log(workerOptions);
  var animationFrameRef = useRef();
  var workerRef = useRef();

  function getWorker() {
    if (!workerRef.current) {
      workerRef.current = new Worker();
    }

    return workerRef.current;
  }

  function rafLoop() {
    animationFrameRef.current = requestAnimationFrame(rafLoop);
    var buffer = new ArrayBuffer(analyser.frequencyBinCount);
    var dataArray = new Uint8Array(buffer);
    analyser.getByteTimeDomainData(dataArray);
    getWorker().postMessage(
      {
        timeDomainData: buffer,
      },
      [buffer]
    );
  }

  useEffect(function () {
    if (canvasRef !== null && canvasRef !== void 0 && canvasRef.current) {
      console.log('transfer canvas to Worker + start rAF loop');
      var worker = getWorker();
      var offscreenCanvas = canvasRef.current.transferControlToOffscreen();
      worker.postMessage(
        {
          canvas: offscreenCanvas,
        },
        [offscreenCanvas]
      );
      rafLoop();
      var animationFrame = animationFrameRef.current;
      return function () {
        cancelAnimationFrame(animationFrame);
      };
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(
    function () {
      var worker = getWorker();
      worker.postMessage({
        workerOptions: workerOptions,
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [workerOptions]
  );
}

export default useTimeDomainData;
