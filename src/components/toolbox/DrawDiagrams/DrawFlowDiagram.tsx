import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector } from 'react-redux'
import { RootState } from '../../../store';

const Agents = () => {
    const handleDelete = (idx: number) => {
        console.log("hello")
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
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Load CMS
                            </TableCell>
                            <TableCell>
                                circle
                            </TableCell>
                            <TableCell align="center">
                                Vector DB
                            </TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => { handleDelete(1) }} aria-label="fingerprint" color="primary">
                                    <ClearIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )

}

const DrawFlowDiagram = () => {
    const count = useSelector((state: RootState) => state.drawFlowDiagram.value)

    return (
        <div>
            <span>{count}</span>
            <Agents />
            Connections
            <Agents />
        </div>

    )
}

export default DrawFlowDiagram