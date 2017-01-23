import React from 'react'
import autobind from 'autobind-decorator'

const styles = {
  inputContainer: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    color: '#a9a9a9',
    cursor: 'pointer'
  },
  input: {
    cursor: 'pointer',
    display: 'block',
    fontSize: 20,
    filter: 'alpha(opacity=0)',
    minHeight: '100%',
    minWidth: '100%',
    opacity: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'right',
    top: 0
  }
}

export default class Component extends React.Component {

  static propTypes = {
    placeholder: React.PropTypes.node,
    upload: React.PropTypes.func,
    onChange: React.PropTypes.func
  }

  state = {}

  @autobind
  onChange (event) {
    const file = event.target.files[0]
    if (!file) return
    this.setState({uploading: true, fileName: file.name})
    this.props.upload({
      file,
      onProgress: (progress) => {
        console.log(progress)
        this.setState({progress})
      },
      onReady: (file) => {
        this.props.onChange(file)
      },
      onError: (message) => {
        console.log(message)
        this.setState({uploading: false, errorMessage: message})
      }
    })
  }

  renderInput () {
    return <input type='file' style={styles.input} onChange={this.onChange} />
  }

  renderPlaceholderOrName () {
    if (!this.state.fileName) {
      return this.props.placeholder
    } else {
      const style = this.state.uploading ? {color: '#a9a9a9'} : {color: '#000'}
      return <div style={style}>{this.state.fileName}</div>
    }
  }

  render () {
    return (
      <div>
        <div style={styles.inputContainer}>
          {this.renderPlaceholderOrName()}
          {this.renderInput()}
        </div>
      </div>
    )
  }

}
