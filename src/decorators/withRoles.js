import React from 'react'

export default function (ComposedComponent) {
  return class WithRoles extends React.Component {

    static contextTypes = {
      me: React.PropTypes.object
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
