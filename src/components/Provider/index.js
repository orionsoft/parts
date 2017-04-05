import React from 'react'
import Message from './Message'
import Modal from './Modal'
import MeProvider from './MeProvider'

export default class OrionsoftProvider extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    meProvider: React.PropTypes.bool
  }

  static defaultProps = {
    meProvider: true
  }

  renderMe () {
    if (!this.props.meProvider) return this.props.children
    return (
      <MeProvider>
        {this.props.children}
      </MeProvider>
    )
  }

  render () {
    return (
      <Message>
        <Modal>
          {this.renderMe()}
        </Modal>
      </Message>
    )
  }

}
