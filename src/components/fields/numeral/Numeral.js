import React from 'react'
import autobind from 'autobind-decorator'
import isNumber from 'lodash/isNumber'
import styles from '../Text/styles'
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

  unformatValue (label) {
    return label === '' ? undefined : numeral._.stringToNumber(label)
  }

  formatValue (real) {
    return isNumber(real) ? numeral(real).format('$0,0[.]00') : ''
  }

  @autobind
  onChange (event) {
    const value = event.target.value
    const real = this.unformatValue(value)
    this.props.onChange(real)
  }

  getValue () {
    return this.formatValue(this.props.value)
  }

  @autobind
  onKeyDown (event) {
    if (event.keyCode === 8) {
      if (String(this.props.value).length <= 1 || this.props.value === 0) {
        this.props.onChange(null)
      }
    }
  }

  render () {
    return (
      <div style={styles.container}>
        <input
          style={styles.input}
          value={this.getValue()}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          {...this.props.passProps} />
      </div>
    )
  }
}
