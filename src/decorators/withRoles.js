import React from 'react'
import PropTypes from 'prop-types'

export default function (ComposedComponent) {
  return class WithRoles extends React.Component {

    static contextTypes = {
      me: PropTypes.object
    }

    render () {
      const me = this.context.me || {}
      const roles = me.roles || []
      return (
        <ComposedComponent
          {...this.props}
          roles={roles} />
      )
    }
  }
}
