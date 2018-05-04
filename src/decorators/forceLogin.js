import React from 'react'
import PropTypes from 'prop-types'

export default function(ComposedComponent) {
  return class ForceLogin extends React.Component {
    static contextTypes = {
      me: PropTypes.object,
      router: PropTypes.object
    }

    redirect() {
      this.context.router.history.replace({
        pathname: '/login',
        state: {nextPathname: window.location.pathname}
      })
      return <span />
    }

    render() {
      const me = this.context.me
      if (!me) return this.redirect()
      return <ComposedComponent {...this.props} />
    }
  }
}
