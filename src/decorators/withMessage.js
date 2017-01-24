import React from 'react'
import NotificationSystem from 'react-notification-system'
import autobind from 'autobind-decorator'

export default function (ComposedComponent) {
  return class WithMessage extends React.Component {

    @autobind
    showMessage (message, passedOptions) {
      const options = {
        message,
        level: 'success',
        autoDismiss: 0,
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
          <ComposedComponent {...this.props} showMessage={this.showMessage} />
          <NotificationSystem ref='notificationSystem' style={this.getStyle()} />
        </div>
      )
    }
  }
}
