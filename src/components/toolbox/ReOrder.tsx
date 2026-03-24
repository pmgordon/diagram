
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store'
import { changeSceneOrder, deleteScene, playScene as reduxPlayScene } from '../../appSlice'

export const ReOrder = () => {
    const dispatch = useDispatch()
    const sceneData = useSelector((state: RootState) => state.app)

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
        dispatch(deleteScene(idx));
    }

    const playScene = (idx: number) => {
        dispatch(reduxPlayScene(idx))
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
        dispatch(changeSceneOrder({idx, direction}))
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