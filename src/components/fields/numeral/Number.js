import NumeralFieldComponent from './Numeral'
const numeral = global.numeral
if (!numeral) {
  throw new Error('Numeral is required in global variable')
}

export default class FormattedNumberComponent extends NumeralFieldComponent {
  unformatValue(label) {
    return label === '' ? undefined : numeral._.stringToNumber(label)
  }

  formatValue(real) {
    const delimiter = numeral.localeData().delimiters.decimal

    if (typeof real === 'number') {
      real = String(real).replace('.', delimiter)
    }

    const parts = real.split(delimiter)

    const text = numeral(parts[0]) ? numeral(parts[0]).format('0,0.[000000000000000000000]') : ''
    if (parts[1] || real.includes(delimiter)) {
      const decimalText = parts[1] ? parts[1].replace(/\D/g, '') : ''
      return text + delimiter + decimalText
    } else {
      return text
    }
  }
}
