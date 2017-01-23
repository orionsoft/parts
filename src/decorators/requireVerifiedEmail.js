import React from 'react'
import autobind from 'autobind-decorator'

const styles = {
  container: {
    textAlign: 'center',
    padding: 20
  },
  notAllowed: {
    fontSize: 20,
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
  button: {
    fontFamily: 'inherit',
    fontSize: 16,
    padding: '6px 10px',
    borderRadius: 5,
    border: 0,
    backgroundColor: '#dedede',
    outline: 'none',
    cursor: 'pointer'
  },
  sending: {
    backgroundColor: '#eee',
    cursor: 'progress'
  },
  email: {
    marginTop: 10,
    fontSize: 13,
    color: '#5c5c5c'
  }
}

export default function (ComposedComponent) {
  class WithRoles extends React.Component {

    static contextTypes = {
      me: React.PropTypes.object,
      resendVerificationEmail: React.PropTypes.func
    }

    state = {}

    @autobind
    async sendVerificationEmail () {
      if (this.state.sending) return
      const me = this.context.me || {}
      const emails = me.emails || []
      const email = emails[0] || {}
      this.setState({sending: true})
      await this.context.resendVerificationEmail({email: email.address})
    }

    renderNotAllowed () {
      const me = this.context.me || {}
      const emails = me.emails || []
      const email = emails[0] || {}
      return (
        <div style={styles.container}>
          <div style={styles.notAllowed}>
            Not allowed
          </div>
          <div style={styles.needVerify}>
            {this.state.sending ? 'Check your inbox' : 'You need to verify your email'}
          </div>
          <div style={styles.buttonContainer}>
            <button style={{...styles.button, ...(this.state.sending ? styles.sending : {})}} onClick={this.sendVerificationEmail}>
              Send verification email
            </button>
          </div>
          <div style={styles.email}>
            {email.address}
          </div>
        </div>
      )
    }

    render () {
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
