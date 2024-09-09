import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box'
import './App.css';
import Toolbox from './components/toolbox/Toolbox'
import { Stage } from './components/stage/Stage';

function App() {

  const initScene = {
    "Initial": {
      "type": "chain",
      "actions": []
    }
  }
  const [sceneData, setSceneData] = useState(initScene)
  const [svgDiagram, setSvgDiagram] = useState<Element | undefined>(undefined);


  const stageRef = useRef<{ loadSvg: (svgDiagram: Element) => void }>(null);

  useEffect(() => {
    if (svgDiagram === undefined) {
      return;
    }
    stageRef.current?.loadSvg(svgDiagram);

  }, [svgDiagram]);


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Toolbox setSvgDiagram={setSvgDiagram} sceneData={sceneData} setSceneData={setSceneData} />
          </Grid>
          <Grid size={8}>
            <Stage ref={stageRef} sceneData={sceneData} />
          </Grid>
        </Grid>
      </Box>
    </div >
  );
}

export default App;
