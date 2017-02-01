import React from 'react'
import includes from 'lodash/includes'
import Button from '../components/Button'
import isArray from 'lodash/isArray'

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
  },
  button: {
    marginTop: 10
  }
}

const defaultOptions = {
  showMessage: true
}

export default function (requiredRoles, passedOptions) {
  const options = {...defaultOptions, ...passedOptions}
  requiredRoles = isArray(requiredRoles) ? requiredRoles : [requiredRoles]
  return function (ComposedComponent) {
    return class WithRoles extends React.Component {

      static contextTypes = {
        me: React.PropTypes.object
      }

      renderLogin () {
        return (
          <div style={styles.container}>
            <div style={styles.notAllowed}>
              Not logged in
            </div>
            <div style={styles.needRole}>
              You need to log in
            </div>
            <div style={styles.button}>
              <Button to='/login' primary>Login</Button>
            </div>
          </div>
        )
      }

      renderNotAllowed () {
        if (!options.showMessage) return <span />
        const roles = requiredRoles.length === 1 ? `"${requiredRoles[0]}"` : '"' + requiredRoles.join('" or "') + '"'
        return (
          <div style={styles.container}>
            <div style={styles.notAllowed}>
              Not allowed
            </div>
            <div style={styles.needRole}>
              You need the role {roles}
            </div>
          </div>
        )
      }

      render () {
        const me = this.context.me
        if (!me) {
          return this.renderLogin()
        }
        const roles = me.roles || []
        for (const role of requiredRoles) {
          if (includes(roles, role)) {
            return <ComposedComponent {...this.props} />
          }
        }
        return this.renderNotAllowed()
      }
    }
  }
}
