import { useRef } from "react";
import Button from '@mui/material/Button';
import mermaid from 'mermaid';
import DrawFlowDiagram from "./DrawDiagrams/DrawFlowDiagram";




const DrawButton = () => {
    const stageRef = useRef<HTMLDivElement>(null)
    
    const mermaidChart = `
    graph TD;
    A[CMS]
    L[Load CMS]
    subgraph x[Vector DB]
    D@{ shape: procs, label: "Documents"}
    end
    
    C[Search Component]
    0[AI]
    L-->A
    L-->x
    x-->C
    C-->x
    0-->C
  `;

    const handleDoit = async() => {
        console.log("Hello")
        mermaid.initialize({ startOnLoad: false });

        const rendered = await mermaid.render('mermaid-svg', mermaidChart)
        if(!stageRef.current){
            return;
        }
        stageRef.current.innerHTML = rendered.svg;
        
    }


    return (
        <div>
            <DrawFlowDiagram />
            <Button
                component="label"
                variant="outlined"
                sx={{ marginRight: "1rem" }}
                onClick={handleDoit}
            >
                Add
            </Button>
            <div ref={stageRef}>

            </div>
        </div>
    )
}

export default DrawButton;