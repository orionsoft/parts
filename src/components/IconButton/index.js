import React from 'react'
import Tooltip from '../Tooltip'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'

export default class IconButton extends React.Component {

  static propTypes = {
    icon: PropTypes.func,
    size: PropTypes.number,
    onPress: PropTypes.func,
    style: PropTypes.object,
    tooltip: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool
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
