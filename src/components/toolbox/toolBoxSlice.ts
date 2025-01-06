import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ToolBoxState {
  tabValue: string
  svgUploadDisabled: boolean
}

const initialState: ToolBoxState = {
  tabValue: "2",
  svgUploadDisabled: false
}

export const toolBoxSlice = createSlice({
  name: 'toolBox',
  initialState,
  reducers: {
    updateTabValue: (state, action: PayloadAction<string>) => {
      state.tabValue = action.payload
    },
    setSvgUploadDisabled: (state, action: PayloadAction<boolean>) => {
        state.svgUploadDisabled = action.payload
      }
  },
})

// Action creators are generated for each case reducer function
export const { updateTabValue, setSvgUploadDisabled } = toolBoxSlice.actions

export default toolBoxSlice.reducer