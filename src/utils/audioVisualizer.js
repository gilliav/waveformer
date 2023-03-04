export const drawAudioData = (normalizedData, lineWidth, strokeColor) => {
 // Set up the canvas
 const canvas = document.querySelector("canvas");
 const dpr = 1;
 const padding = 0;
 canvas.width = canvas.offsetWidth * dpr;
 canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
 const ctx = canvas.getContext("2d");
 ctx.scale(dpr, dpr);
 ctx.translate(0, canvas.offsetHeight / 2 + padding); // Set Y = 0 to be in the middle of the canvas
 ctx.lineWidth = lineWidth; // how thick the line is
 ctx.strokeStyle = strokeColor; // what color our line is
 ctx.lineCap = "round"

 // draw the line segments
 const width = canvas.offsetWidth / normalizedData.length;
 for (let i = 0; i < normalizedData.length; i++) {
   const x = width * i + lineWidth / 2;
   let height = normalizedData[i] * canvas.offsetHeight - padding;
   if (height < 0) {
       height = 0;
   } else if (height > canvas.offsetHeight / 2) {
       height = height > canvas.offsetHeight / 2;
   }
   drawLineSegment(ctx, x, height, width);
 }
};

const drawLineSegment = (ctx, x, y) => {
 ctx.beginPath();
 ctx.moveTo(x, -y);
 ctx.lineTo(x, y);
 ctx.stroke();
};
