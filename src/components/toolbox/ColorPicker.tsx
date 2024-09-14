'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { CirclePicker, CompactPicker } from 'react-color'


class ColorPicker extends React.Component<any, any> {
  state = {
    displayColorPicker: false,
    color: {
      r: '0',
      g: '98',
      b: '177',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color: any) => {
    this.props.handleChange(color.hex, this.props.idx);
    this.setState({ color: color.rgb })
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `${this.props.color}`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute' as any,
          zIndex: '2',
        },
        cover: {
          position: 'fixed' as any,
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <CompactPicker color={ this.state.color as any } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default ColorPicker