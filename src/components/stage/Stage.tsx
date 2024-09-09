import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Animator } from "./animator"

export declare interface StageProps {
    sceneData: any
}

const myModuleInstance = new Animator();

export const Stage = forwardRef(({ sceneData }: StageProps, ref) => {
    

    const stageRef = useRef<HTMLDivElement>(null)
    

    useEffect(() => {
        console.log(sceneData);
        console.log(myModuleInstance.playScene(sceneData, stageRef.current?.getElementsByTagName("svg")[0]));
    }, [sceneData])

    const loadSvg = (svgDiagram: Element) => {
        console.log(svgDiagram)
        if (!stageRef.current) {
            return;
        }
        const currentStage = stageRef.current;
        currentStage.appendChild(svgDiagram);
    };



    useImperativeHandle(ref, () => ({
        loadSvg: (svgDiagram: Element) => {
            loadSvg(svgDiagram)
        }
    }));

    return (
        <div ref={stageRef}></div>
    )
});