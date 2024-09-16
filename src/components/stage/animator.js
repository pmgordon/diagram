// Using a class
export class Animator {
    constructor() {
        this.greetingPrefix = "Hello";
        this.scenes = null;
        this.dotColor = "green"
        this.count = 0;
        this.isPaused = false;
        this.hoverInterval = false;
        this.lastHoverElement = false;
    }

    hoverElement(elementId, svgElement) {
        if (this.hoverInterval) {
            clearInterval(this.hoverInterval);
            this.hoverInterval = false;
        }

        if (this.lastHoverElement) {
            const myPath = svgElement.querySelectorAll(`[diagram-effect-id="${this.lastHoverElement}"]`)[0];
            myPath.style.display = "block"
        }

        if (elementId === "") {
            this.lastHoverElement = false;
            return;
        }


        const myPath = svgElement.querySelectorAll(`[diagram-effect-id="${elementId}"]`)[0];
        this.lastHoverElement = elementId;

        this.hoverInterval = setInterval(() => {
            if (myPath.style.display === "none") {
                myPath.style.display = "block"
            } else {
                myPath.style.display = "none"
            }

        }, 100)

    }

    togglePause(svgElement) {
        if (this.isPaused) {
            svgElement.unpauseAnimations();
            this.isPaused = false;
            return;
        }

        svgElement.pauseAnimations();
        this.isPaused = true;


    }

    playScene(sceneData, svgElement) {
        if (!svgElement) {
            return;
        }
        this.scenes = sceneData;
        const scene = this.scenes.scenes[sceneData.currentSceneIdx]
        this.clearEverything(svgElement)
        this.count++

        if (scene.actions.length === 0) {
            return;
        }
        this.renderDots({ "type": scene.type, "idx": 0 }, scene.actions, svgElement, this.count)
    }

    clearEverything(svgElement) {
        svgElement.querySelectorAll('.pg-effect').forEach(e => e.remove());
    }

    renderDots(renderType, actions, svgElement, playCount) {
        if (renderType.type === "chain") {
            const myPath = svgElement.querySelectorAll(`[diagram-effect-id="${actions[renderType.idx].pth}"]`)[0];
            const speed = getDotSpeed(myPath.getTotalLength(), renderType.type);
            this.renderDot(actions[renderType.idx], 0, `${speed}ms`, renderType, actions, svgElement, playCount)
            return
        }

        if (renderType.type === "view") {
            for(const action of actions) {
                console.log(action);
                const myPath = svgElement.querySelectorAll(`[diagram-effect-id="${action.pth}"]`)[0];
                const speed = getDotSpeed(myPath.getTotalLength(), renderType.type);
                const numDots = Math.ceil(speed / 800)
                const beginInterval = Math.round(speed/numDots)
                for(let i = 0; i < numDots; i++){
                    this.renderDotView(action, `-${i*beginInterval}ms`, `${speed}ms`, svgElement)
                }
                
            }

        }
    }

    renderDotView(action, begin, speed, svgElement){
        const ns = "http://www.w3.org/2000/svg";
        const myPath = svgElement.querySelectorAll(`[diagram-effect-id="${action.pth}"]`)[0];
        const circle = document.createElementNS(ns, "circle");
        circle.classList.add('pg-effect')
        circle.setAttribute("r", 5);
        circle.setAttribute("fill", action.color);
        myPath.insertAdjacentElement('afterend', circle);

        const animateMotion = document.createElementNS(ns, "animateMotion");
        animateMotion.setAttribute("dur", speed)
        animateMotion.setAttribute("repeatCount", "indefinite")
        animateMotion.setAttribute("begin", begin)

        if (action.direction === "left") {
            animateMotion.setAttribute("keyPoints", "1;0");
            animateMotion.setAttribute("keyTimes", "0;1")
            circle.setAttribute("fill", action.color)
        }
        const hrefPath = document.createElementNS(ns, "mpath");
        hrefPath.setAttribute("href", `#${myPath.id}`)
        animateMotion.appendChild(hrefPath)
        circle.appendChild(animateMotion)
    }

    renderDot(action, begin, speed, renderType, actions, svgElement, playCount) {
        const ns = "http://www.w3.org/2000/svg";
        const myPath = svgElement.querySelectorAll(`[diagram-effect-id="${actions[renderType.idx].pth}"]`)[0];
        const circle = document.createElementNS(ns, "circle");
        circle.classList.add('pg-effect')
        circle.setAttribute("r", 5);
        circle.setAttribute("fill", action.color);
  
        myPath.insertAdjacentElement('afterend', circle);

        const animateMotion = document.createElementNS(ns, "animateMotion");
        animateMotion.setAttribute("dur", speed)
        animateMotion.setAttribute("repeatCount", "0")
        animateMotion.setAttribute("begin", "1ms")

        svgElement.setCurrentTime("0")

        if (renderType.idx === (actions.length - 1)) {
            renderType.idx = 0;
        } else {
            renderType.idx = renderType.idx + 1;
        }

        animateMotion.onend = () => {
            circle.remove();
            if (this.count === playCount) {
                this.renderDots(renderType, actions, svgElement, playCount);
            }
        }

        if (action.direction === "left") {
            animateMotion.setAttribute("keyPoints", "1;0");
            animateMotion.setAttribute("keyTimes", "0;1")
            circle.setAttribute("fill", action.color)
        }
        const hrefPath = document.createElementNS(ns, "mpath");
        hrefPath.setAttribute("href", `#${myPath.id}`)
        animateMotion.appendChild(hrefPath)
        circle.appendChild(animateMotion)
    }

}

function getDotSpeed(pathLength, renderType) {
    const speeds = {
        "chain" : 10,
        "view" : 20
    }
    const speed = pathLength * speeds[renderType];
    return speed

}

