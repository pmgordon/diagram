import { useSelector, useDispatch } from 'react-redux'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Chip, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';

import { addNewScene, addSceneCopy, changeScene, changeSceneName, changeSceneType } from '../../appSlice'
import type { RootState } from '../../store'

export declare interface SceneMetaDataProps {
    diagramHoveredElement: any
}

export const SceneMetaData = ({ diagramHoveredElement }: SceneMetaDataProps) => {
    const dispatch = useDispatch()
    const sceneData = useSelector((state: RootState) => state.app)
    const getChipColor = () => {
        if (diagramHoveredElement !== "") {
            return "primary"
        }
        return "default"
    }

    const getChipVariant = () => {
        if (diagramHoveredElement !== "") {
            return "filled"
        }
        return "outlined"
    }

    const handleChangeSceneType = (event: any) => {
        dispatch(changeSceneType(event.target.value))
    }

    const handleChangeSceneName = (event: any) => {
        dispatch(changeSceneName(event.target.value))
    }

    const isPrevDisabled = () => {
        if (sceneData.currentSceneIdx === 0) {
            return true
        }
        return false
    }

    const isNextDisabled = () => {
        if ((sceneData.currentSceneIdx + 1) === sceneData.scenes.length) {
            return true
        }
        return false
    }

    const handleSceneChange = (direction: number) => {
        if (direction === -1 && sceneData.currentSceneIdx === 0) {
            return;
        }

        if (direction === 1 && sceneData.currentSceneIdx === sceneData.scenes.length - 1) {
            return;
        }

        dispatch(changeScene(direction))
    }

    const addScene = () => {
        dispatch(addNewScene())
    }

    const copyScene = () => {
        dispatch(addSceneCopy())
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 1 }}>
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
                            <MenuItem value='view'>View</MenuItem>
                            <MenuItem value='chain'>Chain</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 6, md: 1 }}>
                    <IconButton disabled={isNextDisabled()} onClick={() => handleSceneChange(1)} aria-label="delete" color="primary">
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                    <IconButton aria-label="delete" color="primary" onClick={copyScene}>
                        <ContentCopyIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="primary" onClick={addScene}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                    <Chip
                        style={{width: "17px", height: "17px"}}
                        color={getChipColor()}
                        variant={getChipVariant()}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}