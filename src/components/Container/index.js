import React from 'react'
import PropTypes from 'prop-types'

export default class Container extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
    size: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    size: 'big',
    style: {},
    className: ''
  }

  getClassName() {
    const className = ['os_container']
    className.push(`os_container_${this.props.size}`)
    if (this.props.className) {
      className.push(this.props.className)
    }

    return className.join(' ')
  }

  render() {
    return (
      <div className={this.getClassName()} style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}
