
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import { Box, Button, FormControl, Icon, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';

export declare interface SceneMetaDataProps {
    setSceneData: any
    sceneData: any
}

export const SceneMetaData = ({ setSceneData, sceneData }: SceneMetaDataProps) => {

    const handleChangeSceneType = (event: any) => {
        const newState = Object.assign({}, sceneData);
        newState.scenes[sceneData.currentSceneIdx].type = event.target.value;
        setSceneData(newState)
    }

    const handleChangeSceneName = (event: any) => {
        const newState = Object.assign({}, sceneData);
        newState.scenes[sceneData.currentSceneIdx].sceneName = event.target.value;
        setSceneData(newState)
    }

    const isPrevDisabled = () => {
        if (sceneData.currentSceneIdx === 0){
            return true
        }
        return false
    }

    const isNextDisabled = () => {
        if ((sceneData.currentSceneIdx + 1) === sceneData.scenes.length){
            return true
        }
        return false
    }

    const handleSceneChange = (direction: number) => {
        if (direction === -1 && sceneData.currentSceneIdx === 0) {
            return;
        }

        if (direction === 1 && sceneData.currentSceneIdx === sceneData.scenes.length -1 ) {
            return;
        }

        const newState = Object.assign({}, sceneData);
        newState.currentSceneIdx = newState.currentSceneIdx + direction;
        setSceneData(newState)
    }

    const addScene = () => {
        const newScene =       {
            "sceneName" : `Scene ${sceneData.scenes.length + 1}`,
            "type": "chain",
            "actions": []
          }
        const newState = Object.assign({}, sceneData);
        newState.scenes.push(newScene)
        newState.currentSceneIdx = sceneData.scenes.length - 1
        setSceneData(newState)
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            Pick Scene
            <Grid container  spacing={2}>
                <Grid size={{ xs: 6, md: 2 }}>
                    <IconButton disabled={isPrevDisabled()} onClick={() => handleSceneChange(-1)} aria-label="delete" color="primary">
                        <ArrowBackIosIcon />
                    </IconButton>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                    <TextField id="standard-basic" label="Name" variant="standard" onChange={handleChangeSceneName} value={sceneData.scenes[sceneData.currentSceneIdx].sceneName} />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                    <FormControl variant="standard" sx={{ minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={sceneData.scenes[sceneData.currentSceneIdx].type}
                            onChange={handleChangeSceneType}
                            label="Type"
                        >
                            <MenuItem value='chain'>Chain</MenuItem>
                            <MenuItem value='view'>View</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 6, md: 2 }}>
                    <IconButton disabled={isNextDisabled()} onClick={() => handleSceneChange(1)}  aria-label="delete" color="primary">
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Grid>
                <Grid size={{ xs: 6, md: 2 }}>
                    <IconButton aria-label="delete" color="primary" onClick={addScene}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Grid>
            </Grid>

        </Box>
    )
}