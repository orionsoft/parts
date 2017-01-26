import React from 'react'
import styles from './styles'

export default class Text extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    fieldType: React.PropTypes.string,
    passProps: React.PropTypes.object,
    placeholder: React.PropTypes.node,
    errorMessage: React.PropTypes.node
  }

  static defaultProps = {
    fieldType: 'text',
    value: ''
  }

  render () {
    return (
      <div style={styles.container}>
        <input
          style={styles.input}
          type={this.props.fieldType}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={event => this.props.onChange(event.target.value)}
          {...this.props.passProps} />
        <div style={styles.error}>{this.props.errorMessage}</div>
      </div>
    )
  }

}
