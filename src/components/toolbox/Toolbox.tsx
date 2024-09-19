import { useState, useRef } from "react";
import UploadButton from "./Upload";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { SceneTable } from "./Scene";
import { SelectionTable } from "./Selection";
import { Tab } from "@mui/material";
import { SceneMetaData } from "./SceneMetaData";
import { ReOrder } from "./ReOrder";

export declare interface ToolboxProps {
    setSvgDiagram: React.Dispatch<React.SetStateAction<Element | undefined>>,
    setHoveredElement: React.Dispatch<React.SetStateAction<string>>,
    setSceneData: any
    sceneData: any
    tabValue: any
    setTabValue: any
    effectElements : any
    setEffectElements: any
    svgUploadDisabled: any
    setSvgUploadDisabled: any
}


function Toolbox({ setSvgDiagram, setHoveredElement, setSceneData, sceneData, tabValue, setTabValue, effectElements, setEffectElements, svgUploadDisabled, setSvgUploadDisabled  }: ToolboxProps) {
    
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };



    const sceneRef = useRef<{ handleEffectClicked: (elementId: string) => void }>(null);

    return (
        <div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                            <Tab label="Upload" value="1" />
                            <Tab label="Scenes" value="2" />
                            <Tab label="ReOrder" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <UploadButton svgUploadDisabled={svgUploadDisabled} setSvgUploadDisabled={setSvgUploadDisabled} setSvgDiagram={setSvgDiagram} setEffectElements={setEffectElements} setTabValue={setTabValue} />
                    </TabPanel>
                    <TabPanel value="2">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 6, md: 12 }}>
                                    <SceneMetaData sceneData={sceneData} setSceneData={setSceneData} />
                                </Grid>
                                <Grid size={{ xs: 6, md: 12 }}>
                                    Paths
                                    <SelectionTable effectElements={effectElements} setHoveredElement={setHoveredElement} handleEffectClicked={sceneRef.current?.handleEffectClicked} />
                                </Grid>
                                <Grid size={{ xs: 6, md: 12 }}>
                                    <SceneTable ref={sceneRef} sceneData={sceneData} setSceneData={setSceneData} />
                                </Grid>
                            </Grid>
                        </Box>
                    </TabPanel>
                    <TabPanel value="3">
                       <ReOrder sceneData={sceneData} setSceneData={setSceneData} />
                    </TabPanel>
                </TabContext>
            </Box>

        </div >
    );
}

export default Toolbox;