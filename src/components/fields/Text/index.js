import React from 'react'

export default class Text extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    fieldType: React.PropTypes.string,
    passProps: React.PropTypes.object,
    placeholder: React.PropTypes.node,
    errorMessage: React.PropTypes.node
  }

  static defaultProps = {
    fieldType: 'text',
    value: ''
  }

  render () {
    return (
      <div>
        <div className='os-input-container'>
          <input
            ref='input'
            className='os-input-text'
            type={this.props.fieldType}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={event => this.props.onChange(event.target.value)}
            {...this.props.passProps} />
        </div>
        <div className='os-input-error'>{this.props.errorMessage}</div>
      </div>
    )
  }

}
