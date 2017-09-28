import React from 'react'
import PropTypes from 'prop-types'

export default function (ComposedComponent) {
  return class WithMe extends React.Component {

    static contextTypes = {
      me: PropTypes.object
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
