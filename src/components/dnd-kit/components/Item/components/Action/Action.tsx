import React, { forwardRef, CSSProperties } from 'react';
import classNames from 'classnames';

import styles from './Action.module.css';
import { IconButton } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties['cursor'];
}

export const Action = forwardRef<HTMLDivElement, Props>(
  ({ active, className, cursor, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        style={
          {
            ...style,
            cursor,
            '--fill': active?.fill,
            '--background': active?.background,
          } as CSSProperties
        }
      />
    );
  }
);
