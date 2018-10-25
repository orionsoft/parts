import React from 'react'
import PropTypes from 'prop-types'

export default class Text extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    fieldType: PropTypes.string,
    passProps: PropTypes.object,
    placeholder: PropTypes.node,
    errorMessage: PropTypes.node,
    disabled: PropTypes.bool,
    label: PropTypes.node,
    description: PropTypes.node
  }

  static defaultProps = {
    fieldType: 'text',
    value: ''
  }

  render() {
    return (
      <div>
        <div className="label">{this.props.label}</div>
        <div className="os-input-container">
          <input
            ref="input"
            className="os-input-text"
            type={this.props.fieldType}
            value={this.props.value || ''}
            placeholder={this.props.placeholder}
            onChange={event => this.props.onChange(event.target.value)}
            disabled={this.props.disabled}
            {...this.props.passProps}
          />
        </div>
        <div className="description">{this.props.description}</div>
        <div className="os-input-error">{this.props.errorMessage}</div>
      </div>
    )
  }
}
