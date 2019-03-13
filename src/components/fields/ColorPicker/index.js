import React from 'react'
import {ChromePicker} from 'react-color'
import PropTypes from 'prop-types'

export default class ColorPicker extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    passProps: PropTypes.object,
    description: PropTypes.string,
    errorMessage: PropTypes.string
  }

  state = {
    pickerOpen: false
  }

  togglePicker = () => {
    this.setState(({pickerOpen}) => ({pickerOpen: !pickerOpen}))
  }

  closePicker = () => {
    this.setState({pickerOpen: false})
  }

  onChange = value => {
    this.props.onChange(value.hex)
  }

  render() {
    return (
      <div>
        <div className="label">{this.props.label}</div>
        <div className="os-input-container">
          <div className="os-colorpicker-swatch" onClick={this.togglePicker}>
            <div
              className="os-colorpicker-color"
              style={{
                background: this.props.value
              }}
            />
          </div>
          {this.state.pickerOpen ? (
            <div className="os-colorpicker-popover">
              <div className="os-colorpicker-cover" onClick={this.closePicker} />
              <ChromePicker color={this.props.value || '#fff'} onChange={this.onChange} disableAlpha />
            </div>
          ) : null}
        </div>
        <div className="description">{this.props.description}</div>
        <div className="os-input-error">{this.props.errorMessage}</div>
      </div>
    )
  }
}
