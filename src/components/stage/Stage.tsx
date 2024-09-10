import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Animator } from "./animator"
import Button from '@mui/material/Button';

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

    const handleEffectHover = (elementId: string) => {
        console.log(`Hovered ${elementId}`);
        myModuleInstance.hoverElement(elementId, stageRef.current?.getElementsByTagName("svg")[0]);
    }

    const handleSave = () => {
        console.log(stageRef.current?.innerHTML);
        if(! stageRef.current?.innerHTML){
            return;
        }

        const javaScript = 'class Animator{constructor(){this.greetingPrefix="Hello",this.scenes=null,this.dotColor="green",this.count=0,this.isPaused=!1}sayHello(e){return`${this.greetingPrefix}, ${e}!`}togglePause(e){if(this.isPaused)return e.unpauseAnimations(),void(this.isPaused=!1);e.pauseAnimations(),this.isPaused=!0}playScene(e,t){if(!t)return;this.scenes=e;const i=this.scenes.Initial;if(this.clearEverything(t),this.count++,"chain"===i.type){if(0===i.actions.length)return;this.renderDots({type:"chain",idx:0},i.actions,t,this.count)}}clearEverything(e){e.querySelectorAll(".pg-effect").forEach((e=>e.remove()))}renderDots(e,t,i,s){if("chain"!==e.type);else{const r=getDotSpeed(i.querySelectorAll(`[diagram-effect-id="${t[e.idx].pth}"]`)[0].getTotalLength());Math.ceil(r/500);this.renderDot(t[e.idx],0,`${r}ms`,e,t,i,s)}}renderDot(e,t,i,s,r,n,o){const c="http://www.w3.org/2000/svg",d=n.querySelectorAll(`[diagram-effect-id="${r[s.idx].pth}"]`)[0],a=document.createElementNS(c,"circle");a.classList.add("pg-effect"),a.setAttribute("r",5),a.setAttribute("fill",this.dotColor),d.insertAdjacentElement("afterend",a);const l=document.createElementNS(c,"animateMotion");l.setAttribute("dur",i),l.setAttribute("repeatCount","0"),l.setAttribute("begin","1ms"),n.setCurrentTime("0"),s.idx===r.length-1?s.idx=0:s.idx=s.idx+1,l.onend=()=>{a.remove(),this.count===o&&this.renderDots(s,r,n,o)},"left"===e.direction&&(l.setAttribute("keyPoints","1;0"),l.setAttribute("keyTimes","0;1"),a.setAttribute("fill","red"));const u=document.createElementNS(c,"mpath");u.setAttribute("href",`#${d.id}`),l.appendChild(u),a.appendChild(l)}}function getDotSpeed(e){return 10*e}';
        

        const fileContent = `
        <html>
         <body>
         <button id="effect-pause-button">Pause</button>
         ${stageRef.current?.innerHTML}
         </body>
         <script>
         ${javaScript}
         const sceneData = ${JSON.stringify(sceneData)}

         const animator = new Animator()
         animator.playScene(sceneData, document.getElementById("diagram-effect-svg"));
         const button = document.getElementById('effect-pause-button')
         button.addEventListener("click", () => { animator.togglePause(document.getElementById("diagram-effect-svg")); });
         </script>
        </html>
        `

        const element = document.createElement("a");
        const file = new Blob([fileContent], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.html";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }



    useImperativeHandle(ref, () => ({
        loadSvg: (svgDiagram: Element) => {
            loadSvg(svgDiagram)
        },

        handleEffectHover: (elementId: string) => {
            handleEffectHover(elementId);
        }
    }));

    return (
        <div>
                <Button
                    component="label"
                    variant="outlined"
                    onClick={() => handleSave()}>Save</Button>
                <Button
                    component="label"
                    variant="outlined"
                    onClick={() => myModuleInstance.togglePause(stageRef.current?.getElementsByTagName("svg")[0])}>Pause</Button>

            <div ref={stageRef}>

            </div>
        </div>

    )
});