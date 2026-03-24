import { FormControl, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../../store';
import {  addConnection, changeConnectionFrom, changeConnectionTo, changeConnectionType, deleteConnection, FlowAgentConnection } from './drawDataFlowSice';

export const Connections = () => {
    const dispatch = useDispatch()

    const handleAddConnection = () => {
        dispatch(addConnection())
    }

    const handleDelete = (id: string) => {
        dispatch(deleteConnection(id))
    }

    const handleConnectionChangeType = (event: any, id: string) => {
        dispatch(changeConnectionType({ connectionType: event.target.value, id }))
    }

    const handleConnectionFrom = (event: any, id: string) => {
        dispatch(changeConnectionFrom({ connectFrom: event.target.value, id }))
    }

    const handleConnectionTo = (event: any, id: string) => {
        dispatch(changeConnectionTo({ connectTo: event.target.value, id }))
    }

    const connections = useSelector((state: RootState) => state.drawFlowDiagram.connections)
    const agents = useSelector((state: RootState) => state.drawFlowDiagram.agents)

    // if (connections.length === 0) {
    //     return null;
    // }

    // const menuItems = () => {
    //     return agents.map((agent: FlowAgent, idx: number) => (
    //         <MenuItem value={agent.id}>{agent.agentName}</MenuItem>
    //     ))
    // }

    const connectionRows = () => {
        return connections.map((connection: FlowAgentConnection, idx: number) => (
            <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    <FormControl variant="standard" sx={{ minWidth: 50, maxWidth: 75 }}>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={connection.connectFrom}
                            onChange={(evt) => handleConnectionFrom(evt, connection.connectionId)}
                            label="Type"
                        >
                            {/* {menuItems()} */}
                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell>
                    <FormControl variant="standard" sx={{ minWidth: 50, maxWidth: 100 }}>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={connection.connectionType}
                            onChange={(evt) => handleConnectionChangeType(evt, connection.connectionId)}
                            label="Type"
                        >
                            <MenuItem value='solid'>Solid</MenuItem>
                            <MenuItem value='dashed'>Dashed</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell align="center">
                    <FormControl variant="standard" sx={{ minWidth: 50, maxWidth: 75 }}>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={connection.connectTo}
                            onChange={(evt) => handleConnectionTo(evt, connection.connectionId)}
                            label="Type"
                        >
                            {/* {menuItems()} */}
                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell align="center">
                    <IconButton onClick={() => { handleDelete(connection.connectionId) }} aria-label="fingerprint" color="primary">
                        <ClearIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        ))
    }

    return (
        <div>
            Connections
            <IconButton onClick={() => { handleAddConnection() }} aria-label="fingerprint" color="primary">
                <AddCircleOutlineIcon />
            </IconButton>
            <Grid size={{ xs: 6, md: 12 }}>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>From</TableCell>
                                <TableCell>Dash</TableCell>
                                <TableCell align="left">To</TableCell>
                                <TableCell align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {connectionRows()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </div>
    )
}

export default Connections