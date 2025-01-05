import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton, Stack } from '@mui/material';
import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store'
import ColorPicker from './ColorPicker';
import { East, West } from '@mui/icons-material';
import { changeEffectColor, changeEffectDirection, changeEffectOrder, deleteEffect } from '../../appSlice';


export declare interface SceneProps {
    setHoveredElement: any
}

export const SceneTable = forwardRef(({ setHoveredElement }: SceneProps, ref) => {
    const dispatch = useDispatch()
    const sceneData = useSelector((state: RootState) => state.app)
    const handleDirectionChange = (idx: number) => {
        dispatch(changeEffectDirection(idx))
    }

    const handleDelete = (idx: number) => {
        dispatch(deleteEffect(idx))
    }

    const handleColorChange = (color: string, idx: number) => {
        dispatch(changeEffectColor({idx, color}))
    }

    const moveDisabled = (idx: number, direction: number) => {
        if (idx === 0 && direction === -1) {
            return true
        }
        if (idx === (sceneData.scenes[sceneData.currentSceneIdx].actions.length - 1) && direction === 1) {
            return true
        }
        return false
    }

    const handleMove = (idx: number, direction: number) => {
        if (idx === 0 && direction === -1) {
            return;
        }

        if (idx === (sceneData.scenes[sceneData.currentSceneIdx].actions.length - 1) && direction === 1) {
            return;
        }
        dispatch(changeEffectOrder({idx, direction}))
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Path</TableCell>
                        <TableCell align="center">Direction</TableCell>
                        <TableCell align="center">Color</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sceneData.scenes[sceneData.currentSceneIdx].actions.map((effect: any, idx: number) => (
                        <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Stack spacing={1}>
                                    <IconButton onClick={() => { handleMove(idx, -1) }} disabled={moveDisabled(idx, -1)} aria-label="fingerprint" color="primary">
                                        <KeyboardArrowUpIcon />
                                    </IconButton>
                                    <IconButton style={{ marginTop: "-15px" }} onClick={() => { handleMove(idx, 1) }} disabled={moveDisabled(idx, 1)} aria-label="fingerprint" color="primary">
                                        <KeyboardArrowDownIcon />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                            <TableCell
                                onMouseOver={() => { setHoveredElement(effect.pth) }}
                                onMouseOut={() => { setHoveredElement("") }}
                                component="th" scope="row">
                                {effect.shortName}
                            </TableCell>
                            <TableCell align="center">

                                {effect.direction === "right" &&
                                    <IconButton onClick={() => { handleDirectionChange(idx) }} aria-label="fingerprint" color="primary">
                                        <East />
                                    </IconButton>
                                }
                                {effect.direction === "left" &&
                                    <IconButton onClick={() => { handleDirectionChange(idx) }} aria-label="fingerprint" color="primary">
                                        <West />
                                    </IconButton>
                                }
                            </TableCell>
                            <TableCell align="center"><ColorPicker handleChange={handleColorChange} color={effect.color} idx={idx} /></TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => { handleDelete(idx) }} aria-label="fingerprint" color="primary">
                                    <ClearIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});