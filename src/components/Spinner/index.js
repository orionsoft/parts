import React from 'react'

export default class Spinner extends React.Component {

  static propTypes = {
    size: React.PropTypes.number,
    color: React.PropTypes.string,
    loading: React.PropTypes.bool
  }

  static defaultProps = {
    size: 22,
    color: '#606060',
    loading: true
  }

  getStyle () {
    return {
      height: this.props.size,
      width: this.props.size,
      borderTop: `1px solid ${this.props.color}`,
      opacity: this.props.loading ? 1 : 0
    }
  }

  render () {
    return (
      <div className='os_spinner' style={this.getStyle()} />
    )
  }

}
