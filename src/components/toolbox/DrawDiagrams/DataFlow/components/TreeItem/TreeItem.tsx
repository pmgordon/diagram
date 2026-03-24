import React, { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { Action, Handle, Remove } from '../../../../../dnd-kit/components';
import styles from './TreeItem.module.css';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton, InputBase, Paper, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { UniqueIdentifier } from '@dnd-kit/core';

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  value: string | number;
  id: UniqueIdentifier;
  onCollapse?(): void;
  onRemove?(): void;
  onNameChange?: (id: UniqueIdentifier, newName: string) => void;
  wrapperRef?(node: HTMLLIElement): void;
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      id,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      onNameChange,
      style,
      value,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    return (
      <li
        className={classNames(
          styles.Wrapper,
          clone && styles.clone,
          ghost && styles.ghost,
          indicator && styles.indicator,
          disableSelection && styles.disableSelection,
          disableInteraction && styles.disableInteraction
        )}
        ref={wrapperRef}
        style={
          {
            '--spacing': `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className={styles.TreeItem} ref={ref} style={style}>
          <Handle {...handleProps} />
          {onCollapse && (
            <Action
              onClick={onCollapse}
              className={classNames(
                styles.Collapse,
                collapsed && styles.collapsed
              )}
            >
              <IconButton>
                {collapsed ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Action>
          )}
          <span className={styles.Text}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Agent Name"
              value={value} 
              onChange={(evt) => {
                if (onNameChange){
                  onNameChange(id, evt.target.value)}
                }
              }
              />
          </span>
          {!clone && onRemove && <Remove onClick={onRemove} />}
          {clone && childCount && childCount > 1 ? (
            <span className={styles.Count}>{childCount}</span>
          ) : null}
        </div>
      </li>
    );
  }
);

