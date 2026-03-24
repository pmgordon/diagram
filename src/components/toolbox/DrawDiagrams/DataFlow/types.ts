import type {MutableRefObject} from 'react';
import type {UniqueIdentifier} from '@dnd-kit/core';

export interface FlowAgent {
  id: UniqueIdentifier;
  agentName: string;
  agentDisplayName: string;
  agentType: string;
  children: FlowAgent[];
  collapsed?: boolean;
}

export type FlowAgents = FlowAgent[];

export interface FlattenedItem extends FlowAgent {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
