import React from 'react'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import Provider from './Provider'
import Loading from './Loading'
import PropTypes from 'prop-types'

@withGraphQL(gql`query getMe {
  me {
    _id
    roles
    emails {
      address
      verified
    }
  }
}`, {
  loading: null,
  networkErrorComponent: null
})
@withMutation(gql`mutation resendVerificationEmail ($email: String) {
  resendVerificationEmail (email: $email) {
    success
  }
}`)
export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    me: PropTypes.object,
    resendVerificationEmail: PropTypes.func,
    _data: PropTypes.object
  }

  render () {
    if (this.props._data.networkStatus !== 7) return <Loading />
    return (
      <Provider me={this.props.me} resendVerificationEmail={this.props.resendVerificationEmail}>
        {this.props.children}
      </Provider>
    )
  }
}
