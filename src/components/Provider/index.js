import React from 'react'
import Message from './Message'
import Modal from './Modal'
import MeProvider from './MeProvider'
import PropTypes from 'prop-types'

export default class OrionsoftProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    meProvider: PropTypes.bool
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
