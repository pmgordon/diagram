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
import { forwardRef, useImperativeHandle, useState } from 'react';
import ColorPicker from './ColorPicker';
import { addEffectToScene } from '../../services/util';
import { East, West } from '@mui/icons-material';


export declare interface SceneProps {
    setSceneData: any
    sceneData: any
    setHoveredElement: any
}

type ActionDataType = {
    pth: string;
    direction: string
    color: string
};

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


export const SceneTable = forwardRef(({ setSceneData, setHoveredElement, sceneData }: SceneProps, ref) => {


    const handleEffectClicked = (effectElement: any) => {
        addEffectToScene(sceneData, setSceneData, effectElement)
    }

    const handleDirectionChange = (idx: number) => {
        const newState = Object.assign({}, sceneData);
        const currentDirection = newState.scenes[sceneData.currentSceneIdx].actions[idx].direction;
        if (currentDirection == "right") {
            newState.scenes[sceneData.currentSceneIdx].actions[idx].direction = "left";
        } else {
            newState.scenes[sceneData.currentSceneIdx].actions[idx].direction = "right";
        }
        setSceneData(newState)
    }

    const handleDelete = (idx: number) => {
        const newState = Object.assign({}, sceneData);
        newState.scenes[sceneData.currentSceneIdx].actions.splice(idx, 1);
        setSceneData(newState)
    }

    const handleColorChange = (color: string, idx: number) => {
        const newState = Object.assign({}, sceneData);
        newState.scenes[sceneData.currentSceneIdx].actions[idx].color = color;
        console.log(newState)
        setSceneData(newState)

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
        const newState = Object.assign({}, sceneData);
        let newArray = Object.assign([], sceneData.scenes[sceneData.currentSceneIdx].actions);

        if (direction === -1) {
            newArray = array_move(newArray, idx, idx - 1)
        }

        if (direction === 1) {
            newArray = array_move(newArray, idx, idx + 1)
        }

        newState.scenes[newState.currentSceneIdx].actions = newArray
        setSceneData(newState)
    }


    useImperativeHandle(ref, () => ({
        handleEffectClicked: (effectElement: any) => {
            handleEffectClicked(effectElement)
        }
    }));

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

                                {effect.direction == "right" &&
                                    <IconButton onClick={() => { handleDirectionChange(idx) }} aria-label="fingerprint" color="primary">
                                        <East />
                                    </IconButton>
                                }
                                {effect.direction == "left" &&
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