import React from 'react'
import autobind from 'autobind-decorator'
import isNumber from 'lodash/isNumber'
const numeral = global.numeral
if (!numeral) {
  throw new Error('Numeral is required in global variable')
}

export default class NComponent extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.any,
    useHint: React.PropTypes.bool,
    label: React.PropTypes.any,
    errorMessage: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    passProps: React.PropTypes.object
  }

  state = {}

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== this.props.value) {
      if (this.props.value) {
        const label = this.formatValue(this.props.value)
        this.setState({label, value: this.props.value})
      } else {
        this.setState({label: '', value: this.props.value})
      }
    }
  }

  unformatValue(label) {
    return label === '' ? undefined : numeral._.stringToNumber(label)
  }

  formatValue(real) {
    return isNumber(real) ? numeral(real).format('$0,0[.]00') : ''
  }

  @autobind
  onChange(event) {
    const label = event.target.value
    if (!label) {
      this.setState({label: ''})
      this.props.onChange(null)
      return
    }
    const value = this.unformatValue(label)
    if (/([.,][0-9]*0|[.,])$/.test(label)) {
      this.setState({label, value})
    } else {
      const formatted = this.formatValue(event.target.value)
      this.setState({label: formatted, value})
    }
    this.props.onChange(value)
  }

  getValue() {
    return this.state.label
    //  return this.formatValue(this.props.value)
  }

  @autobind
  onBlur(event) {
    if (!event.target.value) return
    const real = this.formatValue(event.target.value)
    this.setState({label: real})
  }

  @autobind
  onKeyDown(event) {
    if (event.keyCode === 8) {
      if (String(this.props.value).length <= 1 || this.props.value === 0) {
        this.setState({label: ''})
        this.props.onChange(null)
      }
    }
  }

  render() {
    return (
      <div>
        <div className="os-input-container">
          <input
            className="os-input-text"
            ref="input"
            value={this.getValue()}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            onBlur={this.onBlur}
            {...this.props.passProps}
          />
        </div>
        <div className="os-input-error">{this.props.errorMessage}</div>
      </div>
    )
  }
}
