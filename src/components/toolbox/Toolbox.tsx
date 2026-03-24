import { useRef } from "react";
import UploadButton from "./Upload";
import DrawButton from "./Draw";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store'

import { SceneTable } from "./Scene";
import { Tab } from "@mui/material";
import { SceneMetaData } from "./SceneMetaData";
import { ReOrder } from "./ReOrder";
import { updateTabValue } from '../toolbox/toolBoxSlice';

export declare interface ToolboxProps {
    setHoveredElement: React.Dispatch<React.SetStateAction<string>>,
    diagramHoveredElement: any
}


function Toolbox({
    diagramHoveredElement,
    setHoveredElement}: ToolboxProps) {
    const dispatch = useDispatch()
    const sceneData = useSelector((state: RootState) => state.app)
    const tabValue = useSelector((state: RootState) => state.toolbox.tabValue)

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        dispatch(updateTabValue(newValue))
    };

    const shouldShowEffectGrid = () => {
        if (sceneData.scenes[sceneData.currentSceneIdx].actions.length > 0) {
            return true;
        }
        return false;
    }



    const sceneRef = useRef<{ handleEffectClicked: (elementId: string) => void }>(null);

    return (
        <div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                            <Tab label="Draw" value="1" />
                            <Tab label="Upload" value="2" />
                            <Tab label="Scenes" value="3"/>
                            <Tab label="ReOrder" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <DrawButton />
                    </TabPanel>
                    <TabPanel value="2">
                        <UploadButton />
                    </TabPanel>
                    <TabPanel value="3">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 6, md: 12 }}>
                                    <SceneMetaData diagramHoveredElement={diagramHoveredElement} />
                                </Grid>
                                {shouldShowEffectGrid() &&
                                    <Grid size={{ xs: 6, md: 12 }}>
                                        Effects
                                        <SceneTable ref={sceneRef} setHoveredElement={setHoveredElement} />
                                    </Grid>
                                }
                            </Grid>
                        </Box>
                    </TabPanel>
                    <TabPanel value="4">
                        <ReOrder />
                    </TabPanel>
                </TabContext>
            </Box>

        </div >
    );
}

export default Toolbox;