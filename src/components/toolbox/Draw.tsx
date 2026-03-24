import { useRef } from "react";
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { RootState } from '../../store';
import mermaid from 'mermaid';
import DrawFlowDiagram from "./DrawDiagrams/DrawFlowDiagram";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { EffectElementType, setEffectElements, setSvgDiagram } from "../../appSlice";
import { SortableTree } from "./DrawDiagrams/DataFlow/SortableTree";
import { IconButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { addAgent } from "./DrawDiagrams/DataFlow/drawDataFlowSice";
import { FlowAgent } from "./DrawDiagrams/DataFlow/types";
import { Connections } from "./DrawDiagrams/DataFlow/Connections";




const DrawButton = () => {
    const connections = useSelector((state: RootState) => state.drawFlow.connections)
    const agents = useSelector((state: RootState) => state.drawFlow.agents)
    const dispatch = useDispatch()

    const htmlToNodes = (html: string) => {
        const template = document.createElement('template');
        template.innerHTML = html;
        return template.content.childNodes;
    }

    const getEffectElements = (svg: Element): EffectElementType[] => {
        const elements = svg.querySelectorAll('[diagram-effect-id]');
        const propertyValues = Array.from(elements).map(element => ({
            id: element.getAttribute('diagram-effect-id'),
            shortName: element.getAttribute('diagram-effect-short-name')
        }));
        return propertyValues;
    }

    const replaceIds = (svg: Element) => {
        const paths = Array.from(svg.getElementsByTagName("path") as HTMLCollectionOf<SVGPathElement>);
        let currentId = 0
        // svg.id = "diagram-effect-svg"; # TODO: Make a fix for this
        svg.setAttribute("diagram-effect-svg", "diagram-effect-svg")
        for (const pth of paths) {
            if (pth.id === '') {
                pth.id = `diagram-path-effect-${currentId}`;
            }
            pth.setAttribute("diagram-effect-id", `diagram-path-effect-${currentId}`);
            pth.setAttribute("diagram-effect-short-name", `${pth.tagName} ${currentId + 1}`);
            pth.classList.add("diagram-effect");
            currentId++;
        }
        return svg;
    
    }

    const replaceLines = (svg: Element): Element => {
        const lines = Array.from(svg.getElementsByTagName("line") as HTMLCollectionOf<SVGLineElement>);
    
    
        const ns = "http://www.w3.org/2000/svg";
        for (const line of lines) {
            const replacementPath = document.createElementNS(ns, "path");
            const x1 = line.x1.baseVal.valueAsString;
            const x2 = line.x2.baseVal.valueAsString;
            const y1 = line.y1.baseVal.valueAsString;
            const y2 = line.y2.baseVal.valueAsString;
            const d = `M ${x1} ${y1} L ${x2} ${y2}`
            replacementPath.setAttribute("d", d)
            // Transfer other attributes from the line (like stroke, etc.)
            Array.from(line.attributes).forEach(attr => {
                if (!['x1', 'y1', 'x2', 'y2'].includes(attr.name)) {
                    replacementPath.setAttribute(attr.name, attr.value);
                }
            });
    
            line.replaceWith(replacementPath);
        }
        return svg;
    }

    const reformatSVG = (svg: NodeListOf<ChildNode>, fileType: string): Element => {
    
        let svgElement: Element | null = null;
    
        if (fileType === "svg"){
            const elmArray = Array.from(svg);
            for (const elm of elmArray) {
                if (elm instanceof Element && elm.tagName.toLowerCase() === "svg") {
                    svgElement = elm;
                    break;
                }
            }
        }
    
        if (fileType === "html"){
            const elmArray = Array.from(svg);
            for (const elm of elmArray) {
                if (elm instanceof Element && elm.getElementsByTagName("svg").length > 0) {
                    svgElement = elm.getElementsByTagName("svg")[0];
                    break;
                }
            }
        }
    
        if (!svgElement) {
            throw new Error('No svg element found');
        }
    
        //Replace Lines with paths
        svgElement = replaceLines(svgElement)
        svgElement = replaceIds(svgElement)
        return svgElement;
    }

    const makeAgentGraph = (agent: FlowAgent): string => {

        if (agent.children.length === 0) {
            return `${agent.id}[${agent.agentDisplayName}]\n`
        }

        let values = []

        for (const child of agent.children) {
            let graphValue = makeAgentGraph(child)
            values.push(graphValue)
        }

        const subValue = agent.children.map(agent => makeAgentGraph(agent)).join('')
        const result = `subgraph ${agent.id} [${agent.agentDisplayName}]
                         ${subValue}
                        end
                        `

        return result
        

    }

    const makeChart = () => {
        const graph = `
        graph TD;
          ${agents.map(agent => makeAgentGraph(agent)).join('')}
          ${connections.map(connection => `
          ${connection.connectFrom}-->${connection.connectTo}
          `).join('')}
      `;

      return graph
    }

    let mermaidChart = `
    graph TD;
    A[CMS]
    L[Load CMS]
    subgraph x[Browser]
    D[Get Token]
    end
    
    C[Search Component]
    0[AI]
    L-->A
    L-->x
    x-->C
    C-->x
    0-->C
  `;

    const updateStage = async(mermiadDiagram: string) => {
        mermaid.initialize({ startOnLoad: false });

        const rendered = await mermaid.render('mermaid-svg', mermiadDiagram)

        const nodes = htmlToNodes(rendered.svg);
        const formattedSVG = reformatSVG(nodes, "svg")
        const effectElements = getEffectElements(formattedSVG);

        dispatch(setSvgDiagram(formattedSVG.outerHTML));
        dispatch(setEffectElements(effectElements))
    }

    const handleAddAgent = () => {
        dispatch(addAgent())
    }


    useEffect(() => {
        // This effect will run whenever 'someValue' changes
       console.log("here")
       const graph = makeChart()
       mermaidChart = graph;
       updateStage(graph)
    //    handleDoit()
      }, [connections, agents]);


    return (
        <div>
            Agents
            <IconButton onClick={() => { handleAddAgent() }} aria-label="fingerprint" color="primary">
                <AddCircleOutline />
            </IconButton>

            <SortableTree collapsible removable />
            {(agents.length > 0) &&
               <Connections />
            }
        </div>
    )
}

export default DrawButton;