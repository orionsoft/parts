import React from 'react'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import Button from '../components/Button'
import isPlainObject from 'lodash/isPlainObject'

const styles = {
  container: {
    textAlign: 'center',
    padding: 20
  },
  notAllowed: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
  },
  needVerify: {
    fontSize: 14,
    marginTop: 10,
    color: '#5c5c5c'
  },
  buttonContainer: {
    marginTop: 10
  },
  email: {
    marginTop: 10,
    fontSize: 13,
    color: '#5c5c5c'
  }
}

const getDecorator = function(options) {
  return function(ComposedComponent) {
    class WithRoles extends React.Component {
      static contextTypes = {
        me: PropTypes.object,
        resendVerificationEmail: PropTypes.func
      }

      state = {}

      @autobind
      async sendVerificationEmail() {
        if (this.state.sending) return
        const me = this.context.me || {}
        const emails = me.emails || []
        const email = emails[0] || {}
        this.setState({sending: true})
        await this.context.resendVerificationEmail({email: email.address})
      }

      renderNotAllowed() {
        const me = this.context.me || {}
        const emails = me.emails || []
        const email = emails[0] || {}
        return (
          <div style={styles.container}>
            <div style={styles.notAllowed}>{options.title}</div>
            <div style={styles.needVerify}>
              {this.state.sending ? options.checkYourInbox : options.youNeedToVerify}
            </div>
            <div style={styles.buttonContainer}>
              <Button loading={this.state.sending} onClick={this.sendVerificationEmail}>
                {options.buttonText}
              </Button>
            </div>
            <div style={styles.email}>{email.address}</div>
          </div>
        )
      }

      render() {
        const me = this.context.me || {}
        const emails = me.emails || []
        const email = emails[0] || {}
        const verified = email.verified || false
        if (verified) {
          return <ComposedComponent email={email.address} {...this.props} />
        } else {
          return this.renderNotAllowed()
        }
      }
    }

    return WithRoles
  }
}

export default function(passedOptions) {
  const defaultOptions = {
    title: 'Not allowed',
    checkYourInbox: 'Check your inbox',
    youNeedToVerify: 'You need to verify your email',
    buttonText: 'Send verification email'
  }
  if (isPlainObject(passedOptions)) {
    const options = {
      ...defaultOptions,
      ...passedOptions
    }
    return getDecorator(options)
  } else {
    return getDecorator(defaultOptions)(passedOptions)
  }
}
