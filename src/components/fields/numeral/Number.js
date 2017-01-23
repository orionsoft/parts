import NumeralFieldComponent from './Numeral'
import isNumber from 'lodash/isNumber'
const numeral = global.numeral
if (!numeral) {
  throw new Error('Numeral is required in global variable')
}

export default class FormattedNumberComponent extends NumeralFieldComponent {
  unformatValue (label) {
    return label === '' ? undefined : numeral._.stringToNumber(label)
  }

  formatValue (real) {
    return isNumber(real) ? numeral(real).format('0,0') : ''
  }
}
