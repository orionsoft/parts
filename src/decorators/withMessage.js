import React from 'react'

export default function (ComposedComponent) {
  return class WithMessage extends React.Component {

    static contextTypes = {
      showMessage: React.PropTypes.func.isRequired
    }

    render () {
      return <ComposedComponent {...this.props} showMessage={this.context.showMessage} />
    }
  }
}
