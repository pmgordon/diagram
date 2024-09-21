export const addEffectToScene = (sceneData : any, setSceneData: any, effectElement: any) => {
    const newEffect = {
        "pth": effectElement.id,
        "shortName": effectElement.shortName,
        "direction": "right",
        "color" : "#0062B1"
    }
    const newState = Object.assign({}, sceneData);
    newState.scenes[sceneData.currentSceneIdx].actions.push(newEffect)
    setSceneData(newState)
    
}