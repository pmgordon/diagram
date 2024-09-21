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
    diagramHoveredElement: any
}

export const SelectionTable = ({ effectElements, handleEffectClicked, diagramHoveredElement, setHoveredElement }: SelectionProps) => {

    let hoveredElement = null;

    const handleClicked = (effectElement: any) => {
        handleEffectClicked(effectElement)
    }

    const getChipColor = ( id: string ) => {
        if (id === diagramHoveredElement) {
            return "primary"
        }
        return "default"
    }

    const getChipVariant = ( id: string ) => {
        if (id === diagramHoveredElement) {
            return "filled"
        }
        return "outlined"
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
            onDelete={() => {handleClicked(effectElement)}}
            deleteIcon={<AddIcon />}
            variant={getChipVariant(effectElement.id)}
            color={getChipColor(effectElement.id)}
            />
        ))}
        </div>
    );
}