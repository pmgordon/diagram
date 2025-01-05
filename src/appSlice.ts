import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SceneType {
    "sceneName": string;
    "type": string;
    "actions": any[]
}

export interface SceneState {
    currentSceneIdx: number
    scenes: SceneType[]
}

const initialState: SceneState = {
    currentSceneIdx: 0,
    "scenes": [
        {
            "sceneName": "Scene 1",
            "type": "view",
            "actions": []
        }
    ]
}

const getMoveCurrentIdx = (movingIdx: number, currentIdx: number, direction: number) => {
    let newCurrentIdx = currentIdx;
    if (movingIdx === currentIdx){
        currentIdx = movingIdx + direction;
    }else{
        if ((movingIdx + direction) === currentIdx) {
            if(direction === 1){
                newCurrentIdx = newCurrentIdx - 1;
            }
            if(direction === -1){
                newCurrentIdx = newCurrentIdx + 1;
            }
        }
    }

    return newCurrentIdx;
}

const getBlankEffect = (effectElement: any) => {
    const newEffect = {
        "pth": effectElement.id,
        "shortName": effectElement.shortName,
        "direction": "right",
        "color" : "#0062B1"
    }

    return newEffect
}

const getBlankScene = (sceneNumber: number) => {
    const newScene = {
        "sceneName": `Scene ${sceneNumber}`,
        "type": "view",
        "actions": []
    }
    return newScene
}

const getCopiedScene = (scene: SceneType, sceneNumber: number) => {
    const sceneActions = scene.actions.map((action: any) => ({ ...action }));
    const newScene = {
        "type": scene.type,
        "sceneName": `Scene ${sceneNumber}`,
        "actions": sceneActions
    }

    return newScene
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        migrateState: (state, action: PayloadAction<SceneState>) => {
            state.currentSceneIdx = action.payload.currentSceneIdx
            state.scenes = action.payload.scenes
        },
        addNewScene: (state) => {
            const nextSceneNumber = state.scenes.length + 1
            const blankScene = getBlankScene(nextSceneNumber)
            state.scenes.push(blankScene)
            state.currentSceneIdx = state.scenes.length - 1
        },
        addSceneCopy: (state) => {
            const currentScene = state.scenes[state.currentSceneIdx]
            const nextSceneNumber = state.scenes.length + 1
            const copiedScene = getCopiedScene(currentScene, nextSceneNumber)
            state.scenes.push(copiedScene)
            state.currentSceneIdx = state.scenes.length - 1
        },
        deleteScene: (state, action: PayloadAction<number>) => {
            if (state.currentSceneIdx === action.payload) {
                state.currentSceneIdx = 0;
            }
            if (action.payload < state.currentSceneIdx){
                state.currentSceneIdx --;
            }
            state.scenes.splice(action.payload, 1);
        },
        changeScene: (state, action: PayloadAction<number>) => {
            state.currentSceneIdx = state.currentSceneIdx + action.payload;
        },
        playScene: (state, action: PayloadAction<number>) => {
            state.currentSceneIdx = action.payload;
        },
        changeSceneName: (state, action: PayloadAction<string>) => {
            state.scenes[state.currentSceneIdx].sceneName = action.payload;
        },
        changeSceneType: (state, action: PayloadAction<string>) => {
            state.scenes[state.currentSceneIdx].type = action.payload;
        },
        changeSceneOrder: (state, action: PayloadAction<any>) => {
            const movingIdx = action.payload.idx;
            const currentIdx = state.currentSceneIdx;
            const direction = action.payload.direction

            const newCurrentIdx = getMoveCurrentIdx(movingIdx, currentIdx, direction)
            state.currentSceneIdx = newCurrentIdx;
            state.scenes = array_move(state.scenes, movingIdx, movingIdx + direction)

        },
        addEffectToScene: (state, action: PayloadAction<string>) => {
            const blankEffect = getBlankEffect(action.payload)
            state.scenes[state.currentSceneIdx].actions.push(blankEffect)
        },
        changeEffectDirection: (state, action: PayloadAction<number>) => {
            const currentDirection = state.scenes[state.currentSceneIdx].actions[action.payload].direction;
            if (currentDirection === "right") {
                state.scenes[state.currentSceneIdx].actions[action.payload].direction = "left";
            } else {
                state.scenes[state.currentSceneIdx].actions[action.payload].direction = "right";
            }
        },
        changeEffectColor: (state, action: PayloadAction<any>) => {
            state.scenes[state.currentSceneIdx].actions[action.payload.idx].color = action.payload.color;
        },
        deleteEffect: (state, action: PayloadAction<number>) => {
            state.scenes[state.currentSceneIdx].actions.splice(action.payload, 1);
        },
        changeEffectOrder: (state, action: PayloadAction<any>) => {
            const movingIdx = action.payload.idx;
            const direction = action.payload.direction
            let newArray = Object.assign([], state.scenes[state.currentSceneIdx].actions);
            if (direction === -1) {
                newArray = array_move(newArray, movingIdx, movingIdx - 1)
            }
    
            if (direction === 1) {
                newArray = array_move(newArray, movingIdx, movingIdx + 1)
            }
    
            state.scenes[state.currentSceneIdx].actions = newArray
        },
    }
})


function array_move(arr: any, old_index: number, new_index: number) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};

// Action creators are generated for each case reducer function
export const { 
    migrateState,
    addNewScene, 
    addSceneCopy, 
    changeScene, 
    deleteScene,
    playScene,
    changeSceneName, 
    changeSceneType, 
    changeSceneOrder,
    changeEffectDirection,
    deleteEffect,
    changeEffectColor,
    changeEffectOrder,
    addEffectToScene} = appSlice.actions

export default appSlice.reducer