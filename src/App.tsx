import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box'
import './App.css';
import Toolbox from './components/toolbox/Toolbox'
import { Stage } from './components/stage/Stage';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux'
import type { RootState } from './store'

const htmlToNodes = (html: string) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  let svgElement: Element | null = null;
  
  const elmArray = Array.from(template.content.childNodes);
  for (const elm of elmArray) {
      if (elm instanceof Element && elm.tagName.toLowerCase() === "svg") {
          svgElement = elm;
          break;
      }
  }
  return svgElement
}

function App() {
  const [hoveredElement, setHoveredElement] = useState("");
  const [toolboxOpen, setToolboxOpen] = useState(true)
  const [diagramHoveredElement, setDiagramHoveredElement] = useState("")

  const svgDiagram = useSelector((state: RootState) => state.app.svgDiagram)

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
    // TODO: Add this back
    const htmlNodes = htmlToNodes(svgDiagram)

    if (htmlNodes == null) {
      return;
    }

    stageRef.current?.loadSvg(htmlNodes);

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
              <Toolbox 
              setHoveredElement={setHoveredElement} 
              diagramHoveredElement={diagramHoveredElement}
              />
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
            <Stage ref={stageRef} 
                   diagramHoveredElement={diagramHoveredElement} 
                   setDiagramHoveredElement={setDiagramHoveredElement} />
          </Grid>
        </Grid>
      </Box>
    </div >
  );
}

export default App;
