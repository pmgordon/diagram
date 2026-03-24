import { FormControl, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store';
import { addAgent, addConnection, changeAgentName, changeAgentType, changeConnectionFrom, changeConnectionTo, changeConnectionType, deleteAgent, deleteConnection, FlowAgentConnection, FlowAgentType } from './drawFlowDiagramSlice';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Fragment } from 'react';

const Connections = () => {
    const dispatch = useDispatch()

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

    if (connections.length === 0) {
        return null;
    }

    const menuItems = () => {
        return agents.map((agent: FlowAgentType, idx: number) => (
            <MenuItem value={agent.agentId}>{agent.agentName}</MenuItem>
        ))
    }

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
                            {menuItems()}
                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell>
                    <FormControl variant="standard" sx={{ minWidth: 50,  maxWidth: 100 }}>
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
                            {menuItems()}
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
    )

}

const Agents = () => {
    const dispatch = useDispatch()

    const handleDelete = (id: string) => {
        dispatch(deleteAgent(id))
    }

    const handleAgentChangeName = (event: any, id: string) => {
        dispatch(changeAgentName({ newName: event.target.value, id }))
    }

    const handleAgentChangeType = (event: any, id: string) => {
        dispatch(changeAgentType({ newType: event.target.value, id }))
    }

    const handleConnectionDlete = (event: any, id: string) => {
        dispatch(changeAgentType({ newType: event.target.value, id }))
    }

    const agents = useSelector((state: RootState) => state.drawFlowDiagram.agents)

    if (agents.length === 0) {
        return null;
    }

    const agentRows = () => {
        return agents.map((agent: any, idx: number) => (
            <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    <TextField id="standard-basic" variant="standard" onChange={(evt) => handleAgentChangeName(evt, agent.agentId)} value={agent.agentName} />
                    {/* {agent.agentName} */}
                </TableCell>
                <TableCell>
                    <FormControl variant="standard" sx={{ minWidth: 50 }}>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={agent.agentType}
                            onChange={(evt) => handleAgentChangeType(evt, agent.agentId)}
                            label="Type"
                        >
                            <MenuItem value='box'><CheckBoxOutlineBlankIcon /></MenuItem>
                            <MenuItem value='circle'><CircleOutlinedIcon /></MenuItem>
                            <MenuItem value='document'><InsertDriveFileOutlinedIcon /></MenuItem>
                            <MenuItem value='mult-document'><FileCopyOutlinedIcon /></MenuItem>

                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell align="center">
                    {agent.parent}
                </TableCell>
                <TableCell align="center">
                    <IconButton onClick={() => { handleDelete(agent.agentId) }} aria-label="fingerprint" color="primary">
                        <ClearIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        ))
    }

    return (
        <Grid size={{ xs: 6, md: 12 }}>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Agent</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell align="center">Parent</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {agentRows()}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )

}

const DrawFlowDiagram = () => {
    const agents = useSelector((state: RootState) => state.drawFlowDiagram.agents)
    const dispatch = useDispatch()
    const handleAddAgent = () => {
        dispatch(addAgent())
    }

    const handleAddConnection = () => {
        dispatch(addConnection())
    }

    return (
        <div>
            Agents
            <IconButton onClick={() => { handleAddAgent() }} aria-label="fingerprint" color="primary">
                <AddCircleOutlineIcon />
            </IconButton>

            {(agents.length > 0) &&
                <div>
                    Connections
                    <IconButton onClick={() => { handleAddConnection() }} aria-label="fingerprint" color="primary">
                        <AddCircleOutlineIcon />
                    </IconButton>
                    <Connections />
                </div>
            }
        </div>

    )
}

export default DrawFlowDiagram