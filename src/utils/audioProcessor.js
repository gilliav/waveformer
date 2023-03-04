
// Set up audio context
window.AudioContext = window.AudioContext;
const audioContext = new AudioContext();
let currentBuffer = null;

export const processAudio = (url, numberOfBars) => {
 return fetch(url)
   .then(response => response.arrayBuffer())
   .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
   .then(audioBuffer => {return filterData(audioBuffer, numberOfBars)});
};

const filterData = (audioBuffer, numberOfBars) => {
  const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
  const samples = numberOfBars; // Number of samples we want to have in our final data set
  const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i; // the location of the first sample in the block
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
    }
    filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
  }
  
  return filteredData;
}
