import React from 'react'
// import styles from './styles'
import Input from './Input'
import Show from './Show'
import PropTypes from 'prop-types'

export default class File extends React.Component {

  static propTypes = {
    value: PropTypes.object,
    placeholder: PropTypes.node,
    upload: PropTypes.func.isRequired,
    delete: PropTypes.func
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
