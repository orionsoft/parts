import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PropTypes from 'prop-types'

export default class DropOver extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node
  }

  renderMenu() {
    if (!this.props.open) return
    return (
      <div className="os_dropover" key="menu">
        {this.props.children}
      </div>
    )
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="os_dropover"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
        {this.renderMenu()}
      </ReactCSSTransitionGroup>
    )
  }
}
