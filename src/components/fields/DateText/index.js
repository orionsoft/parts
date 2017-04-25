import React from 'react'
import autobind from 'autobind-decorator'
const moment = global.moment
if (!moment) {
  throw new Error('Moment is required in global variable')
}

export default class DateTextField extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.any,
    useHint: React.PropTypes.bool,
    label: React.PropTypes.any,
    errorMessage: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    passProps: React.PropTypes.object,
    format: React.PropTypes.string
  }

  static defaultProps = {
    format: 'DD-MM-YYYY'
  }

  state = {text: ''}

  @autobind
  setToday () {
    this.props.onChange(new Date())
  }

  getValue () {
    return this.props.value ? moment(this.props.value).format(this.props.format) : this.state.text
  }

  replaceTexts (text, previous) {
    if (previous.length > text.length) return
    if (text.length === 2 || text.length === 5) {
      this.onChange(text + '-')
      return true
    }
  }

  onChange (text) {
    if (text === 'n') {
      return this.props.onChange(new Date())
    }
    if (this.replaceTexts(text, this.state.text)) return
    this.setState({text})
    if (text.length !== 10) return this.props.onChange(null)
    const newValue = moment(text, this.props.format)
    if (!newValue.isValid()) return this.props.onChange(null)
    this.props.onChange(newValue.toDate())
  }

  @autobind
  onBlur () {
    if (!this.props.value) {
      this.setState({text: ''})
    }
  }

  render () {
    return (
      <div>
        <div className='os-input-container'>
          <input
            className='os-input-text'
            value={this.getValue()}
            onChange={(event) => this.onChange(event.target.value)}
            onBlur={this.onBlur}
            {...this.props.passProps} />
        </div>
        <div className='os-input-error'>{this.props.errorMessage}</div>
      </div>
    )
  }

}
