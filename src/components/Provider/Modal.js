import React from 'react'
import OutlineModal from 'boron/OutlineModal'
import autobind from 'autobind-decorator'
import Button from '../Button'

const styles = {
  modal: {
  },
  content: {
    outline: 'none',
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 10
  },
  message: {
    marginBottom: 20
  },
  buttons: {
    textAlign: 'right'
  },
  cancelButton: {
    marginRight: 10
  }
}

export default class Modal extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  static childContextTypes = {
    showModal: React.PropTypes.func
  }

  getChildContext () {
    return {
      showModal: this.showModal
    }
  }

  state = {}

  @autobind
  showModal ({title, message, confirm, confirmText, cancelText, render}) {
    this.setState({title, message, confirm, confirmText, cancelText, render})
    this.refs.modal.show()
  }

  @autobind
  hideModal () {
    this.refs.modal.hide()
  }

  @autobind
  async confirm () {
    const result = await this.state.confirm()
    if (result === false) return
    this.hideModal()
  }

  render () {
    return (
      <div>
        {this.props.children}
        <OutlineModal ref='modal' keyboard modalStyle={styles.modal} contentStyle={styles.content}>
          <div style={styles.title}>
            {this.state.title}
          </div>
          <div style={styles.message}>
            {this.state.render ? this.state.render() : this.state.message}
          </div>
          <div style={styles.buttons}>
            <Button style={styles.cancelButton} onClick={this.hideModal}>{this.state.cancelText}</Button>
            <Button onClick={this.confirm} danger>{this.state.confirmText}</Button>
          </div>
        </OutlineModal>
      </div>
    )
  }

}
