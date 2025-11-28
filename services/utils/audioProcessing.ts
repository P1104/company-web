const audioBufferToWav = (buffer: AudioBuffer): Blob => {
  const numOfChannels = buffer.numberOfChannels;
  const length = buffer.length * numOfChannels * 2;
  const sampleRate = buffer.sampleRate;

  const dataView = new DataView(new ArrayBuffer(44 + length));

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      dataView.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  dataView.setUint32(4, 36 + length, true);
  writeString(8, 'WAVE');

  writeString(12, 'fmt ');
  dataView.setUint32(16, 16, true);
  dataView.setUint16(20, 1, true);
  dataView.setUint16(22, numOfChannels, true);
  dataView.setUint32(24, sampleRate, true);
  dataView.setUint32(28, sampleRate * numOfChannels * 2, true);
  dataView.setUint16(32, numOfChannels * 2, true);
  dataView.setUint16(34, 16, true);

  writeString(36, 'data');
  dataView.setUint32(40, length, true);

  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let channel = 0; channel < numOfChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
      const int16Sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      dataView.setInt16(offset, int16Sample, true);
      offset += 2;
    }
  }

  return new Blob([dataView.buffer], { type: 'audio/wav' });
};

export const handleTTSPlayback = async (
  ttsResponse: string[] | undefined,
  audioEnabled: boolean,
  setTtsAudioUrl: (url: string | null) => void
) => {
  if (!audioEnabled || !ttsResponse?.length) {
    setTtsAudioUrl(null);
    return;
  }

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    const audioBufferPromises = ttsResponse.map(async (base64Audio) => {
      const binaryData = atob(base64Audio);
      const bytes = new Uint8Array(binaryData.length);

      for (let i = 0; i < binaryData.length; i++) {
        bytes[i] = binaryData.charCodeAt(i);
      }

      return await audioContext.decodeAudioData(bytes.buffer);
    });

    const audioBuffers = await Promise.all(audioBufferPromises);

    const totalLength = audioBuffers.reduce((acc, buffer) => acc + buffer.length, 0);
    const numberOfChannels = audioBuffers[0].numberOfChannels;
    const sampleRate = audioBuffers[0].sampleRate;
    
    const combinedBuffer = audioContext.createBuffer(
      numberOfChannels,
      totalLength,
      sampleRate
    );

    let offset = 0;
    for (const buffer of audioBuffers) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        combinedBuffer.getChannelData(channel).set(
          buffer.getChannelData(channel),
          offset
        );
      }
      offset += buffer.length;
    }

    const slowdownFactor = 0.9;
    const slowedSampleRate = Math.floor(sampleRate * slowdownFactor);

    const slowedBuffer = audioContext.createBuffer(
      numberOfChannels,
      combinedBuffer.length,
      slowedSampleRate
    );

    for (let channel = 0; channel < numberOfChannels; channel++) {
      slowedBuffer.copyToChannel(combinedBuffer.getChannelData(channel), channel);
    }

    const audioBlob = audioBufferToWav(slowedBuffer);

    const audioUrl = URL.createObjectURL(audioBlob);
    setTtsAudioUrl(audioUrl);

  } catch (error) {
    console.error("Error processing audio chunks:", error);

    try {
      if (ttsResponse[0]) {
        const binaryData = atob(ttsResponse[0]);
        const bytes = new Uint8Array(binaryData.length);

        for (let i = 0; i < binaryData.length; i++) {
          bytes[i] = binaryData.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: 'audio/wav' });
        const fallbackUrl = URL.createObjectURL(blob);
        setTtsAudioUrl(fallbackUrl);
      } else {
        setTtsAudioUrl(null);
      }
    } catch (fallbackError) {
      console.error("Fallback TTS failed:", fallbackError);
      setTtsAudioUrl(null);
    }
  }
};
