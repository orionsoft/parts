import React from 'react'
import Text from '../Text'
import autobind from 'autobind-decorator'
import cleanRut from './cleanRut'

const numeral = global.numeral
if (!numeral) {
  throw new Error('Numeral is required in global variable')
}

export default class RutField extends React.Component {
  @autobind
  onChange(value) {
    if (!value || value === '-') {
      this.props.onChange(null)
    } else if (value.length <= 2) {
      this.props.onChange(value)
    } else {
      this.props.onChange(cleanRut(value))
    }
  }

  getLabel() {
    const {value} = this.props
    if (!value) return
    if (value.length <= 3) return value
    const cleaned = value.replace(/[^\dkK]/g, '')
    const parts = cleaned.split('')
    const dv = parts.pop()
    return numeral(Number(parts.join(''))).format('0,0') + '-' + dv
  }

  render() {
    return (
      <Text
        {...this.props}
        {...this.props.passProps}
        value={this.getLabel()}
        onChange={this.onChange}
      />
    )
  }
}
