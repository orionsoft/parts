import React from 'react'
import Message from './Message'
import Modal from './Modal'
import MeProvider from './MeProvider'
import PropTypes from 'prop-types'
import ModalContext from './Modal/Context'

export default class OrionsoftProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    meProvider: PropTypes.bool
  }

  static defaultProps = {
    meProvider: true
  }

  renderMe() {
    if (!this.props.meProvider) return this.props.children
    return <MeProvider>{this.props.children}</MeProvider>
  }

  render() {
    return (
      <Message>
        <Modal setShowModal={showModal => (this.showModal = showModal)} />
        <ModalContext.Provider value={options => this.showModal(options)}>
          {this.renderMe()}
        </ModalContext.Provider>
      </Message>
    )
  }
}
