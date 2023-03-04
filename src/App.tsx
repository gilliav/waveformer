import { useEffect, useState } from "react";
import { processAudio } from "./utils/audioProcessor";
import { drawAudioData } from "./utils/audioVisualizer";
import Button from "@mui/material/Button";
import {
  Box,
  Card,
  Container,
  createTheme,
  Input,
  Paper,
  Slider,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { ButtonColor } from "./components/ButtonColor";
import { ColorPicker } from "./components/ColorPicker";

// colors, arranged from darkest to lighest
const BLACK = ["#000"]
const GREEN=['#2f6a76','#3cad98','#73c7ad']
const BROWN=['#3e322d','#593d2b','#ae8961']
const CREAM=['#FFEBB2','#FFF4D1','#FFF9E9']
const ORANGE=['#B95014','#E4781D','#F5A027']
const PURPLE=['#424D88','#6967CF','#AE89C0']
const PINK=['#884257','#C55C7B','#F68789']

const palette = BLACK.concat(BROWN, GREEN, PURPLE, PINK, ORANGE, CREAM);

let DEFAULT_STROKE_COLOR = palette[0];
const DEFAULT_STROKE_WIDTH = 10;
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 200;
const DEFAULT_BARS_NUM = 40;
const CANVAS_MARGIN = 10;

const theme = createTheme({
  typography: {
    fontFamily: 'Manrope'
  },
  palette: {
    primary: {
      main: "#413d3d",
    },
  },
});

function App() {
  const [audioFile, setAudioFile] = useState<string | undefined>();
  const [strokeWidth, setStrokeWidth] = useState<number>(DEFAULT_STROKE_WIDTH);
  const [strokeColor, setStrokeColor] = useState<string>(DEFAULT_STROKE_COLOR);
  const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
  const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
  const [numberOfBars, setNumberOfBars] = useState<number>(DEFAULT_BARS_NUM);
  const [audioData, setAudioData] = useState<number[]>()

  const onFileChange = (event: any) => {
    if (event.target?.files) {
      // Create a blob that we can use as an src for our audio element
      const file = event.target.files[0];
      const urlObj = URL.createObjectURL(file);
      setAudioFile(urlObj);
    }
  };

  const getAudio = () => {
    if (audioFile) {
      return <audio controls={true} src={audioFile}></audio>;
    }
  };

  useEffect(() => {
    if (audioData)
      createSoundwave()
  }, [numberOfBars])

  useEffect(() => {
    if (audioData)
      drawAudioData(audioData, strokeWidth, strokeColor);
  }, [strokeColor, strokeWidth, audioData])

  const createSoundwave = async () => {
    const data = await processAudio(audioFile, numberOfBars);
    setAudioData(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Stack margin={4} spacing={4}>
          <Typography variant="h2" marginBottom={-4} fontWeight="800">
            Waveformer
          </Typography>
          <Typography variant="h4">
            Easily create a customized soundwave
          </Typography>
          <Stack direction={"row"} spacing={4}>
            <div>
              <Input
                inputProps={{ accept: "audio/*" }}
                type="file"
                onChange={onFileChange}
              />
            </div>
            <Box>{getAudio()}</Box>
          </Stack>
          <Stack direction="row" spacing={4}>
            <div>
              <Typography variant="h6">Choose number of bars</Typography>
              <Slider
                defaultValue={DEFAULT_BARS_NUM}
                aria-label="Default"
                min={0}
                max={200}
                valueLabelDisplay="auto"
                value={numberOfBars}
                step={10}
                marks
                onChangeCommitted={(e, value) =>
                  setNumberOfBars(typeof value === "number" ? value : value[0])
                }
              />
            </div>
            <div>
              <Typography variant="h6">Choose Stroke Width</Typography>
              <Slider
                defaultValue={DEFAULT_STROKE_WIDTH}
                aria-label="Default"
                min={1}
                max={20}
                valueLabelDisplay="auto"
                onChangeCommitted={(e, value) =>
                  setStrokeWidth(typeof value === "number" ? value : value[0])
                }
              />
            </div>
          </Stack>
          <div>
          <Typography variant="h6">Choose color</Typography>
          <ColorPicker colors={palette} pickedColor={strokeColor} onColorPicked={(color) => setStrokeColor(color)}/>
          </div>
          <div>
            <Button size="large"
              variant="outlined"
              disabled={audioFile === undefined}
              onClick={() => createSoundwave()}
            >
              Create Soundwave
            </Button>
          </div>
          <div>
            <Paper
              elevation={4}
              sx={{ width: width, height: height, paddingX: CANVAS_MARGIN / 2 }}
            >
              <canvas width={width} height={height} id="canvas"></canvas>
            </Paper>
          </div>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
