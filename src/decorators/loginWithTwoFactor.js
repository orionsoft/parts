import React from 'react'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import autobind from 'autobind-decorator'
import hashPassword from '../helpers/hashPassword'
import PropTypes from 'prop-types'

export default function (ComposedComponent) {
  @withMutation(gql`mutation login ($email: String, $password: HashedPassword, $code: String) {
    loginWithTwoFactor (email: $email, password: $password, code: $code) {
      id
      token
      tokenExpires
    }
  }`)
  class LoginWithTwoFactor extends React.Component {

    static propTypes = {
      login: PropTypes.func
    }

    @autobind
    async login ({email, password, code}) {
      const {loginWithTwoFactor} = await this.props.login({
        email,
        password: hashPassword(password),
        code
      })
      return loginWithTwoFactor
    }

    render () {
      return (
        <div>
          <ComposedComponent loginWithTwoFactor={this.login} {...this.props} />
        </div>
      )
    }
  }

  return LoginWithTwoFactor
}
