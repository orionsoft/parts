import React from 'react'
import PropTypes from 'prop-types'

export default function (ComposedComponent) {
  return class WithModal extends React.Component {

    static contextTypes = {
      showModal: PropTypes.func.isRequired
    }

    render () {
      return <ComposedComponent {...this.props} showModal={this.context.showModal} />
    }
  }
}
