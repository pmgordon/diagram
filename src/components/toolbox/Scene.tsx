import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClearIcon from '@mui/icons-material/Clear';
import { FormControl, IconButton, MenuItem, Select } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';


export declare interface SceneProps {
    setSceneData: any
    sceneData: any
}

type ActionDataType = {
    pth: string;
    direction: string;
};

export const SceneTable = forwardRef(({ setSceneData, sceneData }: SceneProps, ref) => {

    const [currentScene, setCurrentScene] = useState("Initial");

    const handleEffectClicked = (effectId: string) => {
        const newEffect = {
            "pth": effectId,
            "direction": "left"
        }
        const newState = Object.assign({}, sceneData);
        newState[currentScene].actions.push(newEffect)
        setSceneData(newState)
        console.log(effectId)

    }

    const handleDirectionChange = (event: any, idx: number) => {
        const newState = Object.assign({}, sceneData);
        newState[currentScene].actions[idx].direction = event.target.value;
        setSceneData(newState)
    }

    const handleDelete = (idx: number) => {
        const newState = Object.assign({}, sceneData);
        newState[currentScene].actions.splice(idx, 1);
        setSceneData(newState)
    }

    useImperativeHandle(ref, () => ({
        handleEffectClicked: (effectId: string) => {
            handleEffectClicked(effectId)
        }
    }));

    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Path</TableCell>
                        <TableCell align="right">Direction</TableCell>
                        <TableCell align="right">Color</TableCell>
                        <TableCell align="right">Button</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sceneData[currentScene].actions.map((effect: any, idx: number) => (
                        <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {effect.pth}
                            </TableCell>
                            <TableCell align="right">
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={effect.direction}
                                        onChange={(e) => handleDirectionChange(e, idx)}
                                        label="Age"
                                    >
                                        <MenuItem value="left">Left</MenuItem>
                                        <MenuItem value="right">Right</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="right">Red</TableCell>
                            <TableCell align="right">
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