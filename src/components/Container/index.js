import React from 'react'
import PropTypes from 'prop-types'

export default class Container extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
    size: PropTypes.string
  }

  static defaultProps = {
    size: 'big',
    style: {}
  }

  getClassName() {
    const className = ['os_container']
    className.push(`os_container_${this.props.size}`)

    return className.join(' ')
  }

  render() {
    return (
      <div className="os_container" style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}
