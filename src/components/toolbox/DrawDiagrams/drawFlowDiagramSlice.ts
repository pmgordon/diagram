import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid';

export interface FlowAgentType {
  agentName: string;
  agentId: string;
  agentType: string;
  parent: string | null;
}

export interface FlowAgentConnection {
  connectFrom: string | null;
  connectTo: string | null;
  connectionId: string
  connectionType: string
}

export interface FlowDiagramState {
  agents: FlowAgentType[],
  connections: FlowAgentConnection[]
}

const initialState: FlowDiagramState = {
  agents: [],
  connections: [],
}

const getBlankAgent = (): FlowAgentType => {
  const agent = {
    agentName: "Agent",
    agentDisplayName : "Agent",
    agentId: nanoid(11),
    agentType: "box",
    parent: null
  }

  return agent;
}

const getBlankConnection = (): FlowAgentConnection => {
  const connection = {
    connectFrom: null,
    connectTo: null,
    connectionType: "solid",
    connectionId: nanoid(11)
  }

  return connection;
}

export const drawFlowDiagramSlice = createSlice({
  name: 'drawFlowDiagram',
  initialState,
  reducers: {
    addAgent: (state) => {
      const agent = getBlankAgent()
      state.agents.push(agent)
    },
    addConnection: (state) => {
      const connection = getBlankConnection()
      state.connections.push(connection)
    },
    changeAgentName: (state, action: PayloadAction<any>) => {
      const agent = state.agents.find(agent => agent.agentId === action.payload.id);
      if (!agent) {
        return;
      }
      agent.agentName =  action.payload.newName
    },
    changeAgentType: (state, action: PayloadAction<any>) => {
      const agent = state.agents.find(agent => agent.agentId === action.payload.id);
      if (!agent) {
        return;
      }
      agent.agentType =  action.payload.newType
    },
    changeConnectionType: (state, action: PayloadAction<any>) => {
      const connection = state.connections.find(connection => connection.connectionId === action.payload.id);
      if (!connection) {
        return;
      }
      connection.connectionType =  action.payload.connectionType
    },
    changeConnectionFrom: (state, action: PayloadAction<any>) => {
      const connection = state.connections.find(connection => connection.connectionId === action.payload.id);
      if (!connection) {
        return;
      }
      connection.connectFrom =  action.payload.connectFrom
    },
    changeConnectionTo: (state, action: PayloadAction<any>) => {
      const connection = state.connections.find(connection => connection.connectionId === action.payload.id);
      if (!connection) {
        return;
      }
      connection.connectTo =  action.payload.connectTo
    },
    deleteConnection: (state, action: PayloadAction<string>) => {
      state.connections = state.connections.filter((agent) => agent.connectionId !== action.payload);
    },
    deleteAgent: (state, action: PayloadAction<string>) => {
      state.agents = state.agents.filter((agent) => agent.agentId !== action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  addAgent,
  addConnection,
  changeConnectionType,
  changeConnectionFrom,
  changeConnectionTo,
  deleteAgent,
  changeAgentType,
  deleteConnection,
  changeAgentName} = drawFlowDiagramSlice.actions

export default drawFlowDiagramSlice.reducer