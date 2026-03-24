import { configureStore } from '@reduxjs/toolkit'
import drawFlowDiagramReducer from './components/toolbox/DrawDiagrams/drawFlowDiagramSlice'
import drawFlowReducer from './components/toolbox/DrawDiagrams/DataFlow/drawDataFlowSice'
import toolBoxReducer from './components/toolbox/toolBoxSlice'
import appReducer from './appSlice'

export const store = configureStore({
  reducer: {
    drawFlowDiagram: drawFlowDiagramReducer,
    drawFlow: drawFlowReducer,
    toolbox: toolBoxReducer,
    app: appReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch