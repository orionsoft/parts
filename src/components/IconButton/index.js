import React from 'react'
import Tooltip from '../Tooltip'
import autobind from 'autobind-decorator'

export default class IconButton extends React.Component {

  static propTypes = {
    icon: React.PropTypes.func,
    size: React.PropTypes.number,
    onPress: React.PropTypes.func,
    style: React.PropTypes.object,
    tooltip: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    loading: React.PropTypes.bool
  }

  static defaultProps = {
    size: 24,
    onPress: () => {},
    style: {}
  }

  @autobind
  onPress () {
    if (this.props.disabled) return
    if (this.props.loading) return
    this.props.onPress()
  }

  getClassName () {
    const classes = []
    if (this.props.disabled) classes.push('os_iconButton_disabled')
    if (this.props.loading) classes.push('os_iconButton_loading')
    if (!this.props.disabled && !this.props.loading) classes.push('os_iconButton')
    return classes.join(' ')
  }

  renderButton () {
    return (
      <span className={this.getClassName()} onClick={this.onPress} style={this.props.style}>
        <this.props.icon size={this.props.size} />
      </span>
    )
  }

  render () {
    if (this.props.tooltip) {
      return <Tooltip content={this.props.tooltip}>{this.renderButton()}</Tooltip>
    } else {
      return this.renderButton()
    }
  }

}
