import React from 'react'
import includes from 'lodash/includes'

const styles = {
  container: {
    textAlign: 'center',
    padding: 20
  },
  notAllowed: {
    fontSize: 20,
    color: 'red'
  },
  needRole: {
    fontSize: 14,
    marginTop: 10,
    color: '#5c5c5c'
  }
}

export default function (role) {
  return function (ComposedComponent) {
    return class WithRoles extends React.Component {

      static contextTypes = {
        me: React.PropTypes.object
      }

      renderNotAllowed () {
        return (
          <div style={styles.container}>
            <div style={styles.notAllowed}>
              Not allowed
            </div>
            <div style={styles.needRole}>
              You need the role "{role}"
            </div>
          </div>
        )
      }

      render () {
        const me = this.context.me || {}
        const roles = me.roles || []
        if (includes(roles, role)) {
          return <ComposedComponent {...this.props} />
        } else {
          return this.renderNotAllowed()
        }
      }
    }
  }
}
