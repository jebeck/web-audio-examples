/** could consider an option to *not* include analyser via event data */
export default async function connectToAudioInput(
  { audioCtx },
  { destination }
) {
  const analyser = audioCtx.node.createAnalyser();
  const target = destination || audioCtx.node.destination;
  analyser.connect(target);

  try {
    const userStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const stream = audioCtx.node.createMediaStreamSource(userStream);
    stream.connect(analyser);
    return Promise.resolve({
      name: 'userAudioAnalyser',
      node: analyser,
      type: 'AnalyserNode',
      children: [
        {
          name: 'userAudio',
          node: stream,
          type: 'MediaStreamAudioSourceNode',
          children: [],
        },
      ],
    });
  } catch (err) {
    return Promise.reject({ error: err });
  }
}
