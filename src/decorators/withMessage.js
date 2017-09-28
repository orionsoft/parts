import React from 'react'
import PropTypes from 'prop-types'

export default function (ComposedComponent) {
  return class WithMessage extends React.Component {

    static contextTypes = {
      showMessage: PropTypes.func.isRequired
    }

    render () {
      return <ComposedComponent {...this.props} showMessage={this.context.showMessage} />
    }
  }
}
