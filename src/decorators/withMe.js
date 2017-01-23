import React from 'react'

export default function (ComposedComponent) {
  return class WithMe extends React.Component {

    static contextTypes = {
      me: React.PropTypes.object
    }

    render () {
      const me = this.context.me || {}
      return (
        <ComposedComponent
          {...this.props}
          me={me} />
      )
    }
  }
}
