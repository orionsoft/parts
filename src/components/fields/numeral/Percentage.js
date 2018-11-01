import React from 'react'
import autobind from 'autobind-decorator'
import isNumber from 'lodash/isNumber'
import PropTypes from 'prop-types'

const numeral = global.numeral
if (!numeral) {
  throw new Error('Numeral is required in global variable')
}

const propTypes = {
  /**
   * True to save values in numbers from 0 to 100
   */
  fullNumber: PropTypes.bool
}

const defaultProps = {}

export default class PercentageComponent extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    useHint: PropTypes.bool,
    label: PropTypes.any,
    errorMessage: PropTypes.string,
    disabled: PropTypes.bool,
    passProps: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      value: this.formatValue(props.value)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: this.formatValue(nextProps.value)
      })
    }
  }

  unformatValue(label) {
    if (label === '') return
    const parsed = numeral._.stringToNumber(label + '%') * 0.01
    return Number(parsed.toFixed(10))
  }

  formatValue(real) {
    return isNumber(real) ? numeral(real).format('0.[00000]%') : ''
  }

  @autobind
  onBlur(event) {
    const value = event.target.value
    const real = this.unformatValue(value)
    this.props.onChange(real)
  }

  @autobind
  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.onBlur(event)
    }
  }

  render() {
    return (
      <div>
        <div className="label">{this.props.label}</div>
        <div className="os-input-container">
          <input
            className="os-input-text"
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            {...this.props.passProps}
          />
        </div>
        <div className="description">{this.props.description}</div>
        <div className="os-input-error">{this.props.errorMessage}</div>
      </div>
    )
  }
}

PercentageComponent.propTypes = propTypes
PercentageComponent.defaultProps = defaultProps
