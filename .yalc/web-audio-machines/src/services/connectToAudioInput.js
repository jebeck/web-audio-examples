/** could consider an option to *not* include analyser via event data */
export default async function connectToAudioInput(
  { audioCtx },
  { destination }
) {
  const analyser = audioCtx.createAnalyser();
  const target = destination || audioCtx.destination;
  analyser.connect(target);

  try {
    const userStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const stream = audioCtx.createMediaStreamSource(userStream);
    stream.connect(analyser);
    console.log('Hi there!');
    return Promise.resolve({
      name: 'userAudioAnalyser',
      children: [{ name: 'userAudio' }],
    });
  } catch (err) {
    return Promise.reject({ error: err });
  }
}
