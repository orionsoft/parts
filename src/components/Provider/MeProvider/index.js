import React from 'react'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import Provider from './Provider'
import Loading from './Loading'

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
    children: React.PropTypes.node,
    me: React.PropTypes.object,
    resendVerificationEmail: React.PropTypes.func,
    data: React.PropTypes.object
  }

  render () {
    if (this.props.data.networkStatus !== 7) return <Loading />
    return (
      <Provider me={this.props.me} resendVerificationEmail={this.props.resendVerificationEmail}>
        {this.props.children}
      </Provider>
    )
  }

}
