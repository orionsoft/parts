import React from 'react'
import keys from 'lodash/keys'
import omit from 'lodash/omit'
import Tooltip from '../Tooltip'
import BounceLoading from '../BounceLoading'
import PropTypes from 'prop-types'

export default class Button extends React.Component {

  static propTypes = {
    tooltip: PropTypes.string,
    to: PropTypes.string,
    linkButton: PropTypes.bool,
    label: PropTypes.any,
    children: PropTypes.any,
    primary: PropTypes.bool,
    danger: PropTypes.bool,
    big: PropTypes.bool,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    fullWidth: PropTypes.bool
  }

  static defaultProps = {
    linkButton: false,
    primary: false,
    danger: false,
    big: false,
    style: {},
    disabled: false,
    fullWidth: false
  }

  getChildProps () {
    const omitKeys = keys(Button.propTypes)
    if (this.props.disabled || this.props.loading) {
      omitKeys.push('onClick')
    }
    return omit(this.props, ...omitKeys)
  }

  getClassName () {
    const classes = ['orion_button']
    if (this.props.disabled) {
      classes.push('orion_disabled')
    } else if (this.props.loading) {
      classes.push('orion_loading')
    } else if (this.props.danger) {
      classes.push('orion_danger')
    } else if (this.props.primary) {
      classes.push('orion_primary')
    }
    if (this.props.big) {
      classes.push('orion_big')
    }
    if (this.props.fullWidth) {
      classes.push('orion_fullWidth')
    }
    return classes.join(' ')
  }

  renderInner () {
    if (this.props.loading) {
      return <BounceLoading />
    } if (this.props.label) {
      return this.props.label
    } else {
      return this.props.children
    }
  }

  renderButton () {
    return (
      <span className={this.getClassName()} style={this.props.style}>
        {this.renderInner()}
      </span>
    )
  }

  renderLinkButton () {
    return (
      <a {...this.getChildProps()}>
        {this.renderButton()}
      </a>
    )
  }

  renderMain () {
    if (this.props.linkButton || this.props.href || this.props.to) {
      return this.renderLinkButton()
    } else {
      return (
        <span className='os_button_container' {...this.getChildProps()}>
          {this.renderButton()}
        </span>
      )
    }
  }

  render () {
    if (this.props.tooltip) {
      return <Tooltip content={this.props.tooltip}>{this.renderMain()}</Tooltip>
    } else {
      return this.renderMain()
    }
  }

}
