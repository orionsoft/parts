import React from 'react'

export default function (ComposedComponent) {
  return class WithModal extends React.Component {

    static contextTypes = {
      showModal: React.PropTypes.func.isRequired
    }

    render () {
      return <ComposedComponent {...this.props} showModal={this.context.showModal} />
    }
  }
}
