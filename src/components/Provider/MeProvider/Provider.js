import React from 'react'

export default class Component extends React.Component {

  static propTypes = {
    me: React.PropTypes.object,
    children: React.PropTypes.node,
    resendVerificationEmail: React.PropTypes.func
  }

  static childContextTypes = {
    me: React.PropTypes.object,
    resendVerificationEmail: React.PropTypes.func
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
