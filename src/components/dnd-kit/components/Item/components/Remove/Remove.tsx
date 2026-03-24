import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Action, ActionProps } from '../Action';
import { IconButton } from '@mui/material';

export function Remove(props: ActionProps) {
  return (
    <Action
      {...props}
      active={{
        fill: 'rgba(255, 70, 70, 0.95)',
        background: 'rgba(255, 70, 70, 0.1)'
      }}
    >
      <IconButton>
        <ClearIcon fontSize="inherit" style={{"fontSize": "18px"}} />
      </IconButton>
    </Action>
  );
}
