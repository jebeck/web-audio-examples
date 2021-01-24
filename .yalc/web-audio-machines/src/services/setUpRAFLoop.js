export default async function setUpRAFLoop({
  analyser,
  animationFrame,
  el,
  worker,
}) {
  function rafLoop() {
    animationFrame = requestAnimationFrame(rafLoop);

    const buffer = new ArrayBuffer(analyser.frequencyBinCount);
    const dataArray = new Uint8Array(buffer);
    analyser.getByteTimeDomainData(dataArray);
    worker.postMessage({ timeDomainData: buffer }, [buffer]);
  }

  try {
    const offscreenCanvas = el.transferControlToOffscreen();
    worker.postMessage({ canvas: offscreenCanvas }, [offscreenCanvas]);

    rafLoop();

    return Promise.resolve();
  } catch (err) {
    return Promise.reject({ error: err });
  }
}
