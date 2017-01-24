import React from 'react'
import Message from './Message'
import Modal from './Modal'

export default class OrionsoftProvider extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <Message>
        <Modal>
          {this.props.children}
        </Modal>
      </Message>
    )
  }

}
