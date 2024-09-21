import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Animator } from "./animator"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { Typography } from "@mui/material";

export declare interface StageProps {
    sceneData: any
    setSceneData: any
    setDiagramHoveredElement: any
    diagramHoveredElement: any
}

const myModuleInstance = new Animator();

export const Stage = forwardRef(({ sceneData, setDiagramHoveredElement, diagramHoveredElement ,setSceneData }: StageProps, ref) => {
    const stageRef = useRef<HTMLDivElement>(null)
    const [pauseDisabled, setPauseDisabled] = useState(true)
    const [isPaused, setIsPaused] = useState(false)

    let lastTimeout: ReturnType<typeof setTimeout>;

    useEffect(() => {
        myModuleInstance.playScene(sceneData, stageRef.current?.getElementsByTagName("svg")[0]);
    }, [sceneData])

    const isPrevDisabled = () => {
        if (sceneData.currentSceneIdx === 0){
            return true
        }
        return false
    }

    const isNextDisabled = () => {
        if ((sceneData.currentSceneIdx + 1) === sceneData.scenes.length){
            return true
        }
        return false
    }

    const togglePause = () => {
        if(isPaused){
            setIsPaused(false)
            return
        }
        setIsPaused(true)
    }

    const getHeader = () => {
        const currentScene = sceneData.currentSceneIdx + 1;
        const numberOfScenes = sceneData.scenes.length;
        const sceneName = sceneData.scenes[sceneData.currentSceneIdx].sceneName

        return `Scene ${currentScene} of ${numberOfScenes} - (${sceneName})`
    }

    const handleSceneChange = (direction: number) => {
        if (direction === -1 && sceneData.currentSceneIdx === 0) {
            return;
        }

        if (direction === 1 && sceneData.currentSceneIdx === sceneData.scenes.length -1 ) {
            return;
        }

        const newState = Object.assign({}, sceneData);
        newState.currentSceneIdx = newState.currentSceneIdx + direction;
        setSceneData(newState)
    }

    const loadSvg = (svgDiagram: Element) => {
        if (!stageRef.current) {
            return;
        }
        const currentStage = stageRef.current;
        svgDiagram = appendDiagramHover(svgDiagram)
        currentStage.appendChild(svgDiagram);
        setPauseDisabled(false)
    };

    const appendDiagramHover = (svgDiagam: any) => {
        const effects = svgDiagam.getElementsByClassName("diagram-effect")

        for( const effect of effects){
            effect.addEventListener('mouseover', () => {
                setDiagramHoveredElement(effect.id)
                clearTimeout(lastTimeout)
                lastTimeout = setTimeout(() => {
                        setDiagramHoveredElement("")
                },1500)
              });
        }
        return svgDiagam
    }

    const handleEffectHover = (elementId: string) => {
        myModuleInstance.hoverElement(elementId, stageRef.current?.getElementsByTagName("svg")[0]);
    }

    const handleSave = () => {
        if (!stageRef.current?.innerHTML) {
            return;
        }

        const javaScript = 'class Animator{constructor(){this.greetingPrefix="Hello",this.scenes=null,this.dotColor="green",this.count=0,this.isPaused=!1,this.hoverInterval=!1,this.lastHoverElement=!1}hoverElement(e,t){if(this.hoverInterval&&(clearInterval(this.hoverInterval),this.hoverInterval=!1),this.lastHoverElement){t.querySelectorAll(`[diagram-effect-id="${this.lastHoverElement}"]`)[0].style.display="block"}if(""===e)return void(this.lastHoverElement=!1);const i=t.querySelectorAll(`[diagram-effect-id="${e}"]`)[0];this.lastHoverElement=e,this.hoverInterval=setInterval((()=>{"none"===i.style.display?i.style.display="block":i.style.display="none"}),100)}togglePause(e){if(this.isPaused)return e.unpauseAnimations(),void(this.isPaused=!1);e.pauseAnimations(),this.isPaused=!0}playScene(e,t){if(!t)return;this.scenes=e;const i=this.scenes.scenes[e.currentSceneIdx];this.clearEverything(t),this.addCoverCircle(t),this.count++,0!==i.actions.length&&this.renderDots({type:i.type,idx:0},i.actions,t,this.count)}addCoverCircle(e){const t=document.createElementNS("http://www.w3.org/2000/svg","circle");t.classList.add("pg-effect"),t.setAttribute("r",5),t.setAttribute("fill","white"),e.insertAdjacentElement("beforeend",t)}clearEverything(e){e.querySelectorAll(".pg-effect").forEach((e=>e.remove()))}renderDots(e,t,i,r){if("chain"!==e.type){if("view"===e.type)for(const r of t){console.log(r);const t=getDotSpeed(i.querySelectorAll(`[diagram-effect-id="${r.pth}"]`)[0].getTotalLength(),e.type),s=Math.ceil(t/800),n=Math.round(t/s);for(let e=0;e<s;e++)this.renderDotView(r,`-${e*n}ms`,`${t}ms`,i)}}else{const s=getDotSpeed(i.querySelectorAll(`[diagram-effect-id="${t[e.idx].pth}"]`)[0].getTotalLength(),e.type);this.renderDot(t[e.idx],0,`${s}ms`,e,t,i,r)}}renderDotView(e,t,i,r){const s="http://www.w3.org/2000/svg",n=r.querySelectorAll(`[diagram-effect-id="${e.pth}"]`)[0],l=document.createElementNS(s,"circle");l.classList.add("pg-effect"),l.setAttribute("r",5),l.setAttribute("fill",e.color),n.insertAdjacentElement("afterend",l);const o=document.createElementNS(s,"animateMotion");o.setAttribute("dur",i),o.setAttribute("repeatCount","indefinite"),o.setAttribute("begin",t),"left"===e.direction&&(o.setAttribute("keyPoints","1;0"),o.setAttribute("keyTimes","0;1"),l.setAttribute("fill",e.color));const c=document.createElementNS(s,"mpath");c.setAttribute("href",`#${n.id}`),o.appendChild(c),l.appendChild(o)}renderDot(e,t,i,r,s,n,l){const o="http://www.w3.org/2000/svg",c=n.querySelectorAll(`[diagram-effect-id="${s[r.idx].pth}"]`)[0],a=document.createElementNS(o,"circle");a.classList.add("pg-effect"),a.setAttribute("r",5),a.setAttribute("fill",e.color),c.insertAdjacentElement("afterend",a);const d=document.createElementNS(o,"animateMotion");d.setAttribute("dur",i),d.setAttribute("repeatCount","0"),d.setAttribute("begin","1ms"),n.setCurrentTime("0"),r.idx===s.length-1?r.idx=0:r.idx=r.idx+1,d.onend=()=>{a.remove(),this.count===l&&this.renderDots(r,s,n,l)},"left"===e.direction&&(d.setAttribute("keyPoints","1;0"),d.setAttribute("keyTimes","0;1"),a.setAttribute("fill",e.color));const h=document.createElementNS(o,"mpath");h.setAttribute("href",`#${c.id}`),d.appendChild(h),a.appendChild(d)}}function getDotSpeed(e,t){return e*{chain:10,view:20}[t]}';


        const fileContent = `
        <html>
         <head>
           <style>.effect-button,.effect-header{font-family:-apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"}.effect-wrapper{text-align:center}.effect-header{color:gray;margin-top:10px;margin-bottom:12px}.effect-button{appearance:none;background-color:#fafbfc;border:1px solid rgba(27,31,35,.15);border-radius:6px;box-shadow:rgba(27,31,35,.04) 0 1px 0,rgba(255,255,255,.25) 0 1px 0 inset;box-sizing:border-box;color:#24292e;cursor:pointer;display:inline-block;font-size:14px;font-weight:500;line-height:20px;list-style:none;padding:6px 16px;position:relative;transition:background-color .2s cubic-bezier(.3, 0, .5, 1);user-select:none;-webkit-user-select:none;touch-action:manipulation;vertical-align:middle;white-space:nowrap;word-wrap:break-word}.effect-button:hover{background-color:#f3f4f6;text-decoration:none;transition-duration:.1s}.effect-button:disabled{background-color:#fafbfc;border-color:rgba(27,31,35,.15);color:#959da5;cursor:default}.effect-button:active{background-color:#edeff2;box-shadow:rgba(225,228,232,.2) 0 1px 0 inset;transition:none}.effect-button:focus{outline:transparent 1px}.effect-button:before{display:none}.effect-button:-webkit-details-marker{display:none}</style>
         </head>
         <body>
          <div class="effect-wrapper">
              <div>
                <button class="effect-button" id="effect-pause-button">Pause</button>
                <button class="effect-button" id="effect-prev-button">Previous</button>
                <button class="effect-button" id="effect-next-button">Next</button>
              </div>
              <div class="effect-header" id="effect-header">
                Scene 1 of 1 - (Scene Name)
              </div>
            ${stageRef.current?.innerHTML}
            </div>
         </body>
         <script>
         ${javaScript}
         const sceneData = ${JSON.stringify(sceneData)}

          const updateHeader = () => {
            const header = document.getElementById("effect-header")
            const currentSceneNumber = sceneData.currentSceneIdx + 1
            const currentSceneTotal = sceneData.scenes.length
            const sceneName = sceneData.scenes[sceneData.currentSceneIdx].sceneName
            const text = \`Scene \${currentSceneNumber} of \${currentSceneTotal} - (\${sceneName})\`
            header.innerText = text;
          }

          const disableButtons = () => {
            const nextButton = document.getElementById('effect-next-button')
            const prevButton = document.getElementById('effect-prev-button')

            if (sceneData.currentSceneIdx == 0) {
              prevButton.disabled = true;
            } else {
              prevButton.disabled = false;
            }

            if ((sceneData.currentSceneIdx + 1) == sceneData.scenes.length) {
              nextButton.disabled = true;
            } else {
              nextButton.disabled = false;
            }
          }

         const animator = new Animator()
         updateHeader();
         disableButtons();
         animator.playScene(sceneData, document.getElementById("diagram-effect-svg"));

         const button = document.getElementById('effect-pause-button')
         button.addEventListener("click", () => { animator.togglePause(document.getElementById("diagram-effect-svg")); });
         const next = document.getElementById('effect-next-button')
         next.addEventListener("click", () => {
           sceneData.currentSceneIdx = sceneData.currentSceneIdx + 1;
           animator.playScene(sceneData, document.getElementById("diagram-effect-svg"));
           updateHeader();
           disableButtons();
         });
         const prev = document.getElementById('effect-prev-button')
         prev.addEventListener("click", () => {
           sceneData.currentSceneIdx = sceneData.currentSceneIdx - 1;
           animator.playScene(sceneData, document.getElementById("diagram-effect-svg"));
           updateHeader();
           disableButtons();
         });
         </script>
        </html>
        `

        const element = document.createElement("a");
        const file = new Blob([fileContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.html";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    useImperativeHandle(ref, () => ({
        loadSvg: (svgDiagram: Element) => {
            loadSvg(svgDiagram)
            myModuleInstance.playScene(sceneData, stageRef.current?.getElementsByTagName("svg")[0])
        },

        handleEffectHover: (elementId: string) => {
            handleEffectHover(elementId);
        }
    }));

    return (
        <div style={{ 'textAlign': 'center' }}>
            <Grid container justifyContent="center" alignItems="center" sx={{ textAlign: 'center' }} spacing={2}>
                <Grid size={12} spacing={2}>
                    <Button
                        style={{ 'marginRight': "5px" }}
                        component="label"
                        variant="outlined"
                        disabled={pauseDisabled}
                        onClick={() => handleSave()}>Save</Button>
                    <Button
                        style={{ 'marginRight': "5px" }}
                        component="label"
                        variant="outlined"
                        disabled={pauseDisabled}
                        onClick={() => {
                            togglePause();
                            myModuleInstance.togglePause(stageRef.current?.getElementsByTagName("svg")[0])
                            }}>{isPaused ? 'Resume' : 'Pause' }</Button>
                    <Button
                        style={{ 'marginRight': "5px" }}
                        component="label"
                        variant="outlined"
                        disabled={isPrevDisabled()}
                        onClick={() => handleSceneChange(-1)}>Previous</Button>
                    <Button
                        style={{ 'marginRight': "5px" }}
                        component="label"
                        variant="outlined"
                        disabled={isNextDisabled()}
                        onClick={() => handleSceneChange(1)}>Next</Button>
                </Grid>
                <Grid size={12} spacing={2}>
                    <Typography variant="h6" component="h6" style={{ 'color' : "#505050", 'marginBottom' : '10px', 'fontSize' : "14px"}}>
                    { getHeader() }
                    </Typography>
                </Grid>
            </Grid>

            <div ref={stageRef}>

            </div>
        </div>

    )
});