import NumeralFieldComponent from './Numeral'
const numeral = global.numeral
if (!numeral) {
  throw new Error('Numeral is required in global variable')
}

export default class MoneyComponent extends NumeralFieldComponent {
  unformatValue(label) {
    return label === '' ? undefined : numeral._.stringToNumber(label)
  }

  formatValue(real) {
    return numeral(real) ? numeral(real).format('$0,0.[000000000000000000000]') : ''
  }
}
