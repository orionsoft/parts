import React from 'react'
import autobind from 'autobind-decorator'
import getHeight from './getHeight'
import PropTypes from 'prop-types'

export default class Textarea extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    fieldType: PropTypes.string,
    passProps: PropTypes.object,
    placeholder: PropTypes.node,
    errorMessage: PropTypes.node,
    autoResize: PropTypes.bool,
    rows: PropTypes.number
  }

  static defaultProps = {
    autoResize: true
  }

  state = {height: 41}

  @autobind
  autoResize (event) {
    if (!this.props.autoResize) return
    const {height} = getHeight(this.refs.input)
    if (this.state.height !== height) {
      this.setState({height})
    }
  }

  @autobind
  onChange (event) {
    this.props.onChange(event.target.value)
    this.autoResize(event)
  }

  render () {
    return (
      <div>
        <div className='os-input-container'>
          <textarea
            ref='input'
            className='os-input-text'
            rows={this.props.rows || 1}
            style={{height: this.state.height}}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={this.onChange}
            {...this.props.passProps} />
        </div>
        <div className='os-input-error'>{this.props.errorMessage}</div>
      </div>
    )
  }

}
