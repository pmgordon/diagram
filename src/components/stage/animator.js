// Using a class
export class Animator {
    constructor(scenes, svgElement) {
        this.greetingPrefix = "Hello";
        this.scenes = scenes;
        this.dotColor = "green"
        this.count = 0;
    }

    sayHello(name) {
        return `${this.greetingPrefix}, ${name}!`;
    }

    playScene(sceneData, svgElement) {
        if(! svgElement) {
            return;
        }
        this.scenes = sceneData;
        const scene = this.scenes["Initial"]
        this.clearEverything(svgElement)
        this.count++
        console.log(this.count)
        
        if(scene.type === "chain") {
            if(scene.actions.length === 0) {
                return;
            }
            this.renderDots({"type" : "chain", "idx" :  0}, scene.actions, svgElement, this.count)
        }
    }

    clearEverything(svgElement) {
        console.log(svgElement.querySelectorAll('.pg-effect'))
        svgElement.querySelectorAll('.pg-effect').forEach(e => e.remove());
        console.log(svgElement.querySelectorAll('.pg-effect'))
    }

    renderDots(renderType, actions, svgElement, playCount){
        if(renderType.type === "chain") {
            // const myPath = this.svgElement.getElementById(actions[renderType.idx].pth);
            console.log(actions);
            const myPath = svgElement.querySelectorAll(`[diagram-effect-id="${actions[renderType.idx].pth}"]`)[0];
            const speed = getDotSpeed(myPath.getTotalLength());
            const numDots = Math.ceil(speed / 500)
            console.log(playCount)
            this.renderDot(actions[renderType.idx], 0, `${speed}ms`, renderType, actions, svgElement, playCount)
            return
        }
    }

    renderDot(action, begin, speed, renderType, actions, svgElement, playCount){
        const ns = "http://www.w3.org/2000/svg";
        const myPath = svgElement.querySelectorAll(`[diagram-effect-id="${actions[renderType.idx].pth}"]`)[0];
        const circle = document.createElementNS(ns, "circle");
        circle.classList.add('pg-effect')
        circle.setAttribute("r", 5);
        circle.setAttribute("fill", this.dotColor);
        myPath.insertAdjacentElement('afterend', circle);
    
        const animateMotion = document.createElementNS(ns, "animateMotion");
        animateMotion.setAttribute("dur", speed)
        animateMotion.setAttribute("repeatCount", "0")
        animateMotion.setAttribute("begin", "1ms")
    
        svgElement.setCurrentTime("0")
        
        if(renderType.idx === (actions.length -1)){
            renderType.idx = 0;
        }else{
            renderType.idx = renderType.idx + 1;
        }
        
        // animateMotion.setAttribute("onrepeat", `renderDots(${renderType}, ${actions})`)
        animateMotion.onend = () => {
            circle.remove();
            if (this.count === playCount){
                this.renderDots(renderType, actions, svgElement, playCount);
            }
        }
    
        if (action.direction === "left") {
            animateMotion.setAttribute("keyPoints", "1;0");
            animateMotion.setAttribute("keyTimes", "0;1")
            circle.setAttribute("fill", "red")
        }
        const hrefPath = document.createElementNS(ns, "mpath");
        hrefPath.setAttribute("href", `#${myPath.id}`)
        animateMotion.appendChild(hrefPath)
        circle.appendChild(animateMotion)
    }
    
}

function getDotSpeed(pathLength) {
    const speed = pathLength * 10;
    return speed

}

