import React from 'react'
import styles from './styles'

export default class Textarea extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    fieldType: React.PropTypes.string,
    passProps: React.PropTypes.object,
    placeholder: React.PropTypes.node,
    errorMessage: React.PropTypes.node
  }

  static defaultProps = {
    value: ''
  }

  render () {
    return (
      <div>
        <div style={styles.container}>
          <textarea
            ref='input'
            style={styles.input}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={event => this.props.onChange(event.target.value)}
            {...this.props.passProps} />
        </div>
        <div style={styles.error}>{this.props.errorMessage}</div>
      </div>
    )
  }

}
