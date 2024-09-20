
import { ChangeEvent } from "react";
import Button from '@mui/material/Button';
import UploadFileIcon from "@mui/icons-material/UploadFile";

export declare interface UploadButtonProps {
    setSvgDiagram: React.Dispatch<React.SetStateAction<Element | undefined>>
    setEffectElements: React.Dispatch<React.SetStateAction<any | undefined>>
    setTabValue: React.Dispatch<React.SetStateAction<any | undefined>>
    setSceneData: React.Dispatch<React.SetStateAction<any | undefined>>
    sceneData: any
    svgUploadDisabled: boolean
    setSvgUploadDisabled: any
}

const getEffectElements = (svg: Element) => {
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
    svg.id = "diagram-effect-svg";
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
        const y2 = line.y1.baseVal.valueAsString;
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

const UploadButton = ({ setSceneData, 
                        sceneData,
                        setSvgDiagram, 
                        setEffectElements, 
                        setTabValue, 
                        setSvgUploadDisabled, 
                        svgUploadDisabled }: UploadButtonProps) => {
    const htmlToNodes = (html: string) => {
        const template = document.createElement('template');
        template.innerHTML = html;
        return template.content.childNodes;
    }

    const handleSetScene = (htmlText: string) => {
        const matches = htmlText.match(/const sceneData = (.*?)\n/)
        if (!matches) {
            return
        }
        const parsedScene = JSON.parse(matches[1])
        // const newState = Object.assign({}, sceneData);
        // newState.currentSceneIdx = 0;
        // newState.scenes.concat(parsedScene.secenes)
        setSceneData(parsedScene)

    }

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        let fileType = "svg";
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];

        if (file.type === "text/html"){
            fileType = "html";
        }

        const reader = new FileReader();
        reader.onload = (evt) => {
            if (!evt?.target?.result) {
                return;
            }

            if (typeof evt?.target?.result !== 'string') {
                return;
            }

            const nodes = htmlToNodes(evt?.target?.result);
            const formattedSVG = reformatSVG(nodes, fileType)
            const effectElements = getEffectElements(formattedSVG);

            setSvgDiagram(formattedSVG);
            setEffectElements(effectElements);

            if (fileType === 'html'){
                handleSetScene(evt.target.result)
            }


            setSvgUploadDisabled(true)
            setTabValue("2")


        };
        reader.readAsBinaryString(file);
    };



    return (
        <div>
            <Button
                component="label"
                variant="outlined"
                disabled={svgUploadDisabled}
                startIcon={<UploadFileIcon />}
                sx={{ marginRight: "1rem" }}
            >
                Upload SVG
                <input type="file" accept=".svg" hidden onChange={handleFileUpload} />
            </Button>
            <Button
                component="label"
                variant="outlined"
                disabled={svgUploadDisabled}
                startIcon={<UploadFileIcon />}
                sx={{ marginRight: "1rem" }}
            >
                Upload Html
                <input type="file" accept=".html" hidden onChange={handleFileUpload} />
            </Button>
        </div>
    )
}

export default UploadButton;