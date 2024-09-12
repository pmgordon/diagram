import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';
import ColorPicker from './ColorPicker';


export declare interface SceneProps {
    setSceneData: any
    sceneData: any
}

type ActionDataType = {
    pth: string;
    direction: string
    color: string
};

export const SceneTable = forwardRef(({ setSceneData, sceneData }: SceneProps, ref) => {

    const [currentScene, setCurrentScene] = useState("Initial");
    const [currentSceneType, setCurrentSceneType] = useState("chain");

    const sceneForm = () => {
        const handleChange = (event: any) => {
            const newState = Object.assign({}, sceneData);
            newState[currentScene].type= event.target.value;
            setCurrentSceneType(event.target.value);
            setSceneData(newState)

        }
        return (
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <TextField id="standard-basic" label="Name" variant="standard" defaultValue="Default Scene" />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>

                    <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={currentSceneType}
                        onChange={handleChange}
                        label="Type"
                    >
                        <MenuItem value='chain'>Chain</MenuItem>
                        <MenuItem value='view'>View</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        )
    }

    const handleEffectClicked = (effectElement: any) => {
        const newEffect = {
            "pth": effectElement.id,
            "shortName": effectElement.shortName,
            "direction": "left",
            "color" : "#0062B1"
        }
        const newState = Object.assign({}, sceneData);
        newState[currentScene].actions.push(newEffect)
        setSceneData(newState)

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

    const handleColorChange = (color: string, idx: number) => {
        const newState = Object.assign({}, sceneData);
        newState[currentScene].actions[idx].color = color;
        console.log(newState)
        setSceneData(newState)

    }

    useImperativeHandle(ref, () => ({
        handleEffectClicked: (effectElement: any) => {
            handleEffectClicked(effectElement)
        }
    }));

    return (
        <TableContainer component={Paper}>
            {sceneForm()}
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
                                {effect.shortName}
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
                            <TableCell align="right"><ColorPicker handleChange={handleColorChange} idx={idx} /></TableCell>
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