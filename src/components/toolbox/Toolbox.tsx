import { useState, useRef } from "react";
import UploadButton from "./Upload";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

import { SceneTable } from "./Scene";
import { SelectionTable } from "./Selection";

export declare interface ToolboxProps {
    setSvgDiagram: React.Dispatch<React.SetStateAction<Element | undefined>>,
    setHoveredElement: React.Dispatch<React.SetStateAction<string>>,
    setSceneData: any
    sceneData: any
}


function Toolbox({ setSvgDiagram, setHoveredElement, setSceneData, sceneData }: ToolboxProps) {

    const [effectElements, setEffectElements] = useState([])
    


    const sceneRef = useRef<{ handleEffectClicked: (elementId: string) => void }>(null);

    return (
        <div>
            <UploadButton setSvgDiagram={setSvgDiagram} setEffectElements={setEffectElements} />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 6, md: 12 }}>
                        Paths
                        <SelectionTable effectElements={effectElements} setHoveredElement={setHoveredElement} handleEffectClicked={sceneRef.current?.handleEffectClicked} />
                    </Grid>
                    <Grid size={{ xs: 6, md: 12 }}>
                        <SceneTable ref={sceneRef} sceneData={sceneData} setSceneData={setSceneData} />
                    </Grid>
                </Grid>
            </Box>
        </div >
    );
}

export default Toolbox;