import React from 'react'
import NotificationSystem from 'react-notification-system'
import autobind from 'autobind-decorator'

export default class WithMessage extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  static childContextTypes = {
    showMessage: React.PropTypes.func
  }

  getChildContext () {
    return {
      showMessage: this.showMessage
    }
  }

  @autobind
  showMessage (message, passedOptions) {
    const options = {
      message,
      level: 'success',
      ...passedOptions
    }
    this.refs.notificationSystem.addNotification(options)
  }

  getStyle () {
    return {
      NotificationItem: {
        DefaultStyle: {
          margin: '10px 5px 2px 1px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          borderTop: 'none',
          boxShadow: 'none'
        }
      },
      Dismiss: {
        DefaultStyle: {
          display: 'none'
        }
      }
    }
  }

  render () {
    return (
      <div>
        {this.props.children}
        <NotificationSystem ref='notificationSystem' style={this.getStyle()} />
      </div>
    )
  }
}
