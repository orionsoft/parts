import React from 'react'
import Message from './Message'
import Modal from './Modal'
import MeProvider from './MeProvider'

export default class OrionsoftProvider extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <Message>
        <Modal>
          <MeProvider>
            {this.props.children}
          </MeProvider>
        </Modal>
      </Message>
    )
  }

}
