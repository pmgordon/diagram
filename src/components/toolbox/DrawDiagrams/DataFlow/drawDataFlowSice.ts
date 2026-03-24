import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid';
import { FlowAgent, FlowAgents } from './types';


export interface FlowAgentConnection {
    connectFrom: string | null;
    connectTo: string | null;
    connectionId: string
    connectionType: string
}

export interface FlowDiagramState {
    agents: FlowAgents,
    connections: FlowAgentConnection[]
}

const initialState: FlowDiagramState = {
    agents: [],
    connections: [],
}

const getBlankAgent = (): FlowAgent => {
    const agent = {
        id: nanoid(11),
        agentName: "Agent",
        agentDisplayName: "Agent",
        agentType: "box",
        children: [],
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

const deepFind = (agents: FlowAgents, id: string): FlowAgent | null => {
  for (const agent of agents) {
    if (agent.id === id) {
        return agent
    }
    if (agent.children.length > 0) {
        const result = deepFind(agent.children, id)
        if(result) {
            return result
        }
    }
  }
  return null
}

export const drawDataFlowSlice = createSlice({
    name: 'drawFlow',
    initialState,
    reducers: {
        setAgents: (state, action: PayloadAction<FlowAgents>) => {
            state.agents = action.payload
        },
        addAgent: (state) => {
            const agent = getBlankAgent()
            state.agents.push(agent)
        },
        addConnection: (state) => {
            const connection = getBlankConnection()
            state.connections.push(connection)
        },
        changeAgentName: (state, action: PayloadAction<any>) => {
            const agent = deepFind(state.agents, action.payload.id)
            if (!agent) {
                return;
            }
            
            agent.agentDisplayName = (action.payload.newName === '') ? ' ' : action.payload.newName
            agent.agentName = action.payload.newName
        },
        changeAgentType: (state, action: PayloadAction<any>) => {
            const agent = state.agents.find(agent => agent.id === action.payload.id);
            if (!agent) {
                return;
            }
            agent.agentType = action.payload.newType
        },
        changeConnectionType: (state, action: PayloadAction<any>) => {
            const connection = state.connections.find(connection => connection.connectionId === action.payload.id);
            if (!connection) {
                return;
            }
            connection.connectionType = action.payload.connectionType
        },
        changeConnectionFrom: (state, action: PayloadAction<any>) => {
            const connection = state.connections.find(connection => connection.connectionId === action.payload.id);
            if (!connection) {
                return;
            }
            connection.connectFrom = action.payload.connectFrom
        },
        changeConnectionTo: (state, action: PayloadAction<any>) => {
            const connection = state.connections.find(connection => connection.connectionId === action.payload.id);
            if (!connection) {
                return;
            }
            connection.connectTo = action.payload.connectTo
        },
        deleteConnection: (state, action: PayloadAction<string>) => {
            state.connections = state.connections.filter((agent) => agent.connectionId !== action.payload);
        },
        deleteAgent: (state, action: PayloadAction<string>) => {
            state.agents = state.agents.filter((agent) => agent.id !== action.payload);
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setAgents,
    addAgent,
    addConnection,
    changeConnectionType,
    changeConnectionFrom,
    changeConnectionTo,
    deleteAgent,
    changeAgentType,
    deleteConnection,
    changeAgentName } = drawDataFlowSlice.actions

export default drawDataFlowSlice.reducer