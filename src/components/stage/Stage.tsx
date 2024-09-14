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

        const javaScript = 'class Animator{constructor(){this.greetingPrefix="Hello",this.scenes=null,this.dotColor="green",this.count=0,this.isPaused=!1,this.hoverInterval=!1,this.lastHoverElement=!1}sayHello(e){return`${this.greetingPrefix}, ${e}!`}hoverElement(e,t){if(this.hoverInterval&&(clearInterval(this.hoverInterval),this.hoverInterval=!1),this.lastHoverElement){t.querySelectorAll(`[diagram-effect-id="${this.lastHoverElement}"]`)[0].style.display="block"}if(""===e)return void(this.lastHoverElement=!1);const i=t.querySelectorAll(`[diagram-effect-id="${e}"]`)[0];this.lastHoverElement=e,this.hoverInterval=setInterval((()=>{"none"===i.style.display?i.style.display="block":i.style.display="none"}),100)}togglePause(e){if(this.isPaused)return e.unpauseAnimations(),void(this.isPaused=!1);e.pauseAnimations(),this.isPaused=!0}playScene(e,t){if(!t)return;this.scenes=e;const i=this.scenes.scenes[e.currentSceneIdx];this.clearEverything(t),this.count++,0!==i.actions.length&&this.renderDots({type:i.type,idx:0},i.actions,t,this.count)}clearEverything(e){e.querySelectorAll(".pg-effect").forEach((e=>e.remove()))}renderDots(e,t,i,r){if("chain"!==e.type){if("view"===e.type)for(const r of t){console.log(r);const t=getDotSpeed(i.querySelectorAll(`[diagram-effect-id="${r.pth}"]`)[0].getTotalLength(),e.type),s=Math.ceil(t/800),n=Math.round(t/s);for(let e=0;e<s;e++)this.renderDotView(r,`-${e*n}ms`,`${t}ms`,i)}}else{const s=getDotSpeed(i.querySelectorAll(`[diagram-effect-id="${t[e.idx].pth}"]`)[0].getTotalLength(),e.type);this.renderDot(t[e.idx],0,`${s}ms`,e,t,i,r)}}renderDotView(e,t,i,r){const s="http://www.w3.org/2000/svg",n=r.querySelectorAll(`[diagram-effect-id="${e.pth}"]`)[0],o=document.createElementNS(s,"circle");o.classList.add("pg-effect"),o.setAttribute("r",5),o.setAttribute("fill",e.color),n.insertAdjacentElement("afterend",o);const l=document.createElementNS(s,"animateMotion");l.setAttribute("dur",i),l.setAttribute("repeatCount","indefinite"),l.setAttribute("begin",t),"left"===e.direction&&(l.setAttribute("keyPoints","1;0"),l.setAttribute("keyTimes","0;1"),o.setAttribute("fill",e.color));const c=document.createElementNS(s,"mpath");c.setAttribute("href",`#${n.id}`),l.appendChild(c),o.appendChild(l)}renderDot(e,t,i,r,s,n,o){const l="http://www.w3.org/2000/svg",c=n.querySelectorAll(`[diagram-effect-id="${s[r.idx].pth}"]`)[0],a=document.createElementNS(l,"circle");a.classList.add("pg-effect"),a.setAttribute("r",5),a.setAttribute("fill",e.color),c.insertAdjacentElement("afterend",a);const d=document.createElementNS(l,"animateMotion");d.setAttribute("dur",i),d.setAttribute("repeatCount","0"),d.setAttribute("begin","1ms"),n.setCurrentTime("0"),r.idx===s.length-1?r.idx=0:r.idx=r.idx+1,d.onend=()=>{a.remove(),this.count===o&&this.renderDots(r,s,n,o)},"left"===e.direction&&(d.setAttribute("keyPoints","1;0"),d.setAttribute("keyTimes","0;1"),a.setAttribute("fill",e.color));const h=document.createElementNS(l,"mpath");h.setAttribute("href",`#${c.id}`),d.appendChild(h),a.appendChild(d)}}function getDotSpeed(e,t){return e*{chain:10,view:20}[t]}';
        

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
        <div style={{ 'textAlign' : 'center'}}>
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