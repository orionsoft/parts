import React from 'react'
// import styles from './styles'
import Input from './Input'
import Show from './Show'

export default class File extends React.Component {

  static propTypes = {
    value: React.PropTypes.object,
    placeholder: React.PropTypes.node,
    upload: React.PropTypes.func.isRequired,
    delete: React.PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Upload file',
    delete: () => {}
  }

  render () {
    if (this.props.value) {
      return <Show {...this.props} />
    } else {
      return <Input {...this.props} />
    }
  }

}
