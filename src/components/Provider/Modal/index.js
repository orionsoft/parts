import React from 'react'
import OutlineModal from './OutlineModal'
import autobind from 'autobind-decorator'
import Button from '../../Button'
import withKeyboardEvent from '../../../decorators/withKeyboardEvent'
import PropTypes from 'prop-types'

@withKeyboardEvent('enter', 'confirm')
export default class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    setShowModal: PropTypes.func
  }

  state = {}

  @autobind
  showModal({title, message, confirm, confirmText, cancelText, render}) {
    this.setState({
      title,
      message,
      confirm,
      confirmText,
      cancelText,
      render,
      loading: false,
      open: true
    })
    this.refs.modal.show()
  }

  @autobind
  hideModal() {
    this.refs.modal.hide()
    this.setState({open: false})
  }

  @autobind
  async confirm() {
    if (!this.state.open) return
    this.setState({loading: true})
    const result = await this.state.confirm()
    if (result === false) return this.setState({loading: false})
    this.hideModal()
  }

  render() {
    this.props.setShowModal(this.showModal)
    return (
      <OutlineModal ref="modal" keyboard>
        <div className="os_modal_content">
          <div className="os_title">{this.state.title}</div>
          <div className="os_message">
            {this.state.render ? this.state.render() : this.state.message}
          </div>
          <div className="os_buttons">
            <Button
              disabled={this.state.loading}
              className="os_cancelButton"
              onClick={this.hideModal}>
              {this.state.cancelText}
            </Button>
            <Button loading={this.state.loading} onClick={this.confirm} danger>
              {this.state.confirmText}
            </Button>
          </div>
        </div>
      </OutlineModal>
    )
  }
}
