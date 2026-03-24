import React, {forwardRef} from 'react';

import {Action, ActionProps} from '../Action';
import { IconButton } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';

export const Handle = forwardRef<HTMLDivElement, ActionProps>(
  (props, ref) => {
    return (
      <Action
        ref={ref}
        cursor="grab"
        data-cypress="draggable-handle"
        {...props}
      >
      <IconButton>
         <DragHandleIcon fontSize="inherit" style={{"fontSize": "18px"}}/>
       </IconButton>
      </Action>
    );
  }
);
