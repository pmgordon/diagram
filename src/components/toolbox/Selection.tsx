import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { Chip, IconButton } from '@mui/material';

export declare interface SelectionProps {
    effectElements: any
    handleEffectClicked: any
    setHoveredElement: any
}

export const SelectionTable = ({ effectElements, handleEffectClicked, setHoveredElement }: SelectionProps) => {

    let hoveredElement = null;


    const handleClicked = (id: string) => {
        handleEffectClicked(id)
    }
 
    return (
        <div>
        {effectElements.map((effectElement: any) => (
            <Chip
            key={effectElement.id}
            label={effectElement.shortName}
            onClick={() => { console.log("")}}
            onMouseOver={() => { setHoveredElement(effectElement.id) }}
            onMouseOut={() => {setHoveredElement("")}}
            onDelete={() => {handleClicked(effectElement.id)}}
            deleteIcon={<AddIcon />}
            variant="outlined"
            />
        ))}
        </div>
        // <TableContainer component={Paper}>
        //     <Table size="small" aria-label="a dense table">
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell>Path Name</TableCell>
        //                 <TableCell align="right"></TableCell>
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {effectElements.map((effectElement: any) => (
        //                 <TableRow
        //                     key={effectElement.id}
        //                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //                     onMouseOver={() => {handleHover(effectElement.id)}}
        //                     onMouseOut={() => {handleHoverOut()}}
        //                 >
        //                     <TableCell component="th" scope="row">
        //                         {effectElement.shortName}
        //                     </TableCell>
        //                     <TableCell align="right">
        //                         <IconButton onClick={() => {handleClicked(effectElement.id)}} aria-label="fingerprint" color="primary">
        //                             <AddIcon />
        //                         </IconButton>
        //                     </TableCell>
        //                 </TableRow>
        //             ))}
        //         </TableBody>
        //     </Table>
        // </TableContainer>
    );
}