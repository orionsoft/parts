import React from 'react'
import styles from '../Text/styles'
import SetTodayIcon from 'react-icons/lib/md/today'
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

  renderSetToday () {
    if (this.props.value && (new Date(this.props.value)).toDateString() === (new Date()).toDateString()) return
    return <SetTodayIcon style={{cursor: 'pointer'}} size={25} onClick={this.setToday} />
  }

  render () {
    return (
      <div>
        <div style={styles.container}>
          <input
            style={styles.input}
            value={this.getValue()}
            onChange={(event) => this.onChange(event.target.value)}
            onBlur={this.onBlur}
            {...this.props.passProps} />
          <div style={styles.otherContainer}>
            {this.renderSetToday()}
          </div>
        </div>
        <div style={styles.error}>{this.props.errorMessage}</div>
      </div>
    )
  }

}
