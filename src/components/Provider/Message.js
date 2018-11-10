import React, {Fragment} from 'react'
import NotificationSystem from 'react-notification-system'
import PropTypes from 'prop-types'
import ShowMessageContext from '../../contexts/ShowMessageContext'

export default class WithMessage extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  static childContextTypes = {
    showMessage: PropTypes.func
  }

  getChildContext() {
    return {
      showMessage: this.showMessage
    }
  }

  show(message, level) {
    const options = {
      message,
      level: level || 'info'
    }
    this.refs.notificationSystem.addNotification(options)
  }

  constructor(props) {
    super(props)
    this.showMessage = this.showMessage.bind(this)
  }

  getValidationErrorString({validationErrors}) {
    const keys = Object.keys(validationErrors)
    const texts = []
    for (const key of keys) {
      const code = validationErrors[key]
      if (global.translate) {
        const text = global.translate(`errors.${code}`, {label: key})
        texts.push(text)
      } else {
        texts.push(`${key}: ${code}`)
      }
    }
    return texts.join(', ')
  }

  showMessage(message) {
    if (typeof message === 'string') {
      this.show(message)
    } else if (message.graphQLErrors) {
      for (const graphError of message.graphQLErrors) {
        if (graphError.error === 'validationError') {
          this.show(this.getValidationErrorString(graphError), 'error')
        } else {
          this.show(graphError.message, 'error')
        }
      }
    } else if (message.message) {
      this.show(message.message, 'error')
    } else {
      this.show(message, 'error')
    }
  }

  getStyle() {
    return {
      NotificationItem: {
        DefaultStyle: {
          margin: '10px 5px 2px 1px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          borderTop: 'none',
          boxShadow: 'none'
        },
        error: {
          backgroundColor: '#be0606'
        }
      },
      Dismiss: {
        DefaultStyle: {
          display: 'none'
        }
      },
      Action: {
        DefaultStyle: {
          outline: 'none',
          cursor: 'pointer'
        },
        info: {
          backgroundColor: '#fff',
          color: '#000'
        }
      }
    }
  }

  render() {
    return (
      <Fragment>
        <ShowMessageContext.Provider value={this.showMessage}>
          {this.props.children}
        </ShowMessageContext.Provider>
        <NotificationSystem ref="notificationSystem" style={this.getStyle()} />
      </Fragment>
    )
  }
}
