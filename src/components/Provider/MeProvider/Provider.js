import React from 'react'
import PropTypes from 'prop-types'

export default class Component extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    children: PropTypes.node,
    resendVerificationEmail: PropTypes.func
  }

  static childContextTypes = {
    me: PropTypes.object,
    resendVerificationEmail: PropTypes.func
  }

  getChildContext () {
    return {
      me: this.props.me,
      resendVerificationEmail: this.props.resendVerificationEmail
    }
  }

  render () {
    return <div>{this.props.children}</div>
  }
}
