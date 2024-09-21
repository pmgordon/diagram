
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export declare interface ReOrderProps {
    setSceneData: any
    sceneData: any
}

function array_move(arr: any, old_index: number, new_index: number) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};

export const ReOrder = ({ setSceneData, sceneData }: ReOrderProps) => {

    const showPlayButton = (idx: number) => {
        if (sceneData.currentSceneIdx === idx) {
            return false;
        }
        return true;
    }

    const handleDelete = (idx: number) => {
        if (sceneData.scenes.length === 1) {
            return;
        }
        const newState = Object.assign({}, sceneData);

        if (newState.currentSceneIdx === idx) {
            newState.currentSceneIdx = 0;
        }
        if (idx < newState.currentSceneIdx){
            newState.currentSceneIdx --;
        }
        newState.scenes.splice(idx, 1);
        setSceneData(newState)
    }

    const playScene = (idx: number) => {
        const newState = Object.assign({}, sceneData);

        newState.currentSceneIdx = idx;
        setSceneData(newState)
    }

    const moveDisabled = (idx: number, direction: number) => {
        if (idx === 0 && direction === -1) {
            return true;
        }

        if (idx === (sceneData.scenes.length - 1) && direction === 1) {
            return true;
        }
        return false
    }

    const handleMove = (idx: number, direction: number) => {
        if (idx === 0 && direction === -1) {
            return;
        }

        if (idx === (sceneData.scenes.length - 1) && direction === 1) {
            return;
        }
        const newState = Object.assign({}, sceneData);

        if (idx === sceneData.currentSceneIdx){
            newState.currentSceneIdx = idx + direction;
        }else{
            if ((idx + direction) === newState.currentSceneIdx) {
                if(direction === 1){
                    newState.currentSceneIdx = newState.currentSceneIdx - 1;
                }
                if(direction === -1){
                    newState.currentSceneIdx = newState.currentSceneIdx + 1;
                }
                
            }
        }

        newState.scenes = array_move(newState.scenes, idx, idx + direction)
        setSceneData(newState)
    }


    return (
        <Box>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Move</TableCell>
                            <TableCell align="left">Scene Name</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sceneData.scenes.map((scene: any, idx: number) => (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <IconButton onClick={() => { handleMove(idx, -1) }} disabled={moveDisabled(idx, -1)} aria-label="fingerprint" color="primary">
                                        <KeyboardArrowUpIcon />
                                    </IconButton>
                                    <IconButton onClick={() => { handleMove(idx, 1) }} disabled={moveDisabled(idx, 1)} aria-label="fingerprint" color="primary">
                                        <KeyboardArrowDownIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <IconButton onClick={() => { playScene(idx) }} disabled={! showPlayButton(idx)} aria-label="fingerprint" color="primary">
                                        <PlayArrowIcon />
                                    </IconButton>
                                    {scene.sceneName}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => { handleDelete(idx) }} aria-label="fingerprint" color="primary">
                                        <ClearIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}