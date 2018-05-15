import React from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

export default function(ComposedComponent) {
  return class WithMessage extends React.Component {
    static contextTypes = {
      showMessage: PropTypes.func.isRequired
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

    @autobind
    showMessage(message, options = {}) {
      if (typeof message === 'string') {
        this.context.showMessage(message)
      } else if (message.graphQLErrors) {
        options.level = 'error'
        for (const graphError of message.graphQLErrors) {
          if (graphError.error === 'validationError') {
            this.context.showMessage(this.getValidationErrorString(graphError), options)
          } else {
            this.context.showMessage(graphError.message, options)
          }
        }
      } else if (message.message) {
        options.level = 'error'
        return this.context.showMessage(message.message, options)
      } else {
        return this.context.showMessage(message, options)
      }
    }

    render() {
      return <ComposedComponent {...this.props} showMessage={this.showMessage} />
    }
  }
}
