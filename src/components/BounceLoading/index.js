import React from 'react'

export default class BounceLoading extends React.Component {

  static propTypes = {
    size: React.PropTypes.number,
    color: React.PropTypes.string
  }

  static defaultProps = {
    size: 10,
    color: '#c1c1c1'
  }

  render () {
    const itemStyle = {
      height: this.props.size,
      width: this.props.size,
      backgroundColor: this.props.color
    }
    return (
      <div className='os_bounce_loading'>
        <div className='os_bounce_bounce1' style={itemStyle} />
        <div className='os_bounce_bounce2' style={itemStyle} />
        <div className='os_bounce_bounce3' style={itemStyle} />
      </div>
    )
  }

}
