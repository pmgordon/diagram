import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box'
import './App.css';
import Toolbox from './components/toolbox/Toolbox'
import { Stage } from './components/stage/Stage';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';



function App() {

  const initScene = {
    "currentSceneIdx": 0,
    "scenes": [
      {
        "sceneName": "Scene 1",
        "type": "chain",
        "actions": []
      }
    ]
  }
  const [sceneData, setSceneData] = useState(initScene)
  const [svgDiagram, setSvgDiagram] = useState<Element | undefined>(undefined);
  const [hoveredElement, setHoveredElement] = useState("");
  const [toolboxOpen, setToolboxOpen] = useState(true)

  const handleCloseToolbox = () => {
    setToolboxOpen(false)
  }

  const handleOpenToolbox = () => {
    setToolboxOpen(true)
  }

  const getStageGridSize = () => {
    if (toolboxOpen){
      return 8
    }
    return 12
  }


  const stageRef = useRef<{
    loadSvg: (svgDiagram: Element) => void,
    handleEffectHover: (elementId: string) => void
  }>(null);

  useEffect(() => {
    if (svgDiagram === undefined) {
      return;
    }
    stageRef.current?.loadSvg(svgDiagram);

  }, [svgDiagram]);

  useEffect(() => {

    stageRef.current?.handleEffectHover(hoveredElement);

  }, [hoveredElement]);



  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {toolboxOpen &&
            <Grid size={4} sx={{ position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: '5px', right: '10px', zIndex: '1' }}>
                <IconButton onClick={() => { handleCloseToolbox() }} aria-label="fingerprint" color="primary">
                  <KeyboardDoubleArrowLeftIcon />
                </IconButton>
              </Box>
              <Toolbox setSvgDiagram={setSvgDiagram} sceneData={sceneData} setSceneData={setSceneData} setHoveredElement={setHoveredElement} />
            </Grid>
          }
          <Grid size={getStageGridSize()} sx={{ position: 'relative' }}>
          {!toolboxOpen &&
              <Box sx={{ position: 'absolute', top: '5px', left: '10px', zIndex: '1' }}>
                <IconButton onClick={() => { handleOpenToolbox() }} aria-label="fingerprint" color="primary">
                  <MenuIcon />
                </IconButton>
              </Box>
          }
            <Stage ref={stageRef} sceneData={sceneData} />
          </Grid>
        </Grid>
      </Box>
    </div >
  );
}

export default App;
