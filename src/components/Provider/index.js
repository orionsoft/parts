import React from 'react'
import Message from './Message'

export default class OrionsoftProvider extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <Message>
        {this.props.children}
      </Message>
    )
  }

}
