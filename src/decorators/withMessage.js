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
    showMessage(error, options = {}) {
      options.level = options.level || typeof error === 'string' ? '' : 'error'
      if (typeof error === 'string') {
        return this.context.showMessage(error, options)
      }
      if (error.graphQLErrors) {
        for (const graphError of error.graphQLErrors) {
          if (graphError.error === 'validationError') {
            this.context.showMessage(this.getValidationErrorString(graphError), options)
          } else {
            this.context.showMessage(error.message, options)
          }
        }
        return
      }
      return this.context.showMessage(error.message, options)
    }

    render() {
      return <ComposedComponent {...this.props} showMessage={this.showMessage} />
    }
  }
}
