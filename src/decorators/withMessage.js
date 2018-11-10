import React from 'react'
import ShowMessageContext from '../contexts/ShowMessageContext'

export default function(ComposedComponent) {
  return class WithMessage extends React.Component {
    render() {
      return (
        <ShowMessageContext.Consumer>
          {showMessage => <ComposedComponent {...this.props} showMessage={showMessage} />}
        </ShowMessageContext.Consumer>
      )
    }
  }
}
