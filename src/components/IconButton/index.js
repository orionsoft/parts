import React from 'react'

export default class IconButton extends React.Component {

  static propTypes = {
    icon: React.PropTypes.func,
    size: React.PropTypes.number,
    onPress: React.PropTypes.func
  }

  static defaultProps = {
    size: 24,
    onPress: () => {}
  }

  render () {
    return (
      <span className='os_iconButton' onClick={this.props.onPress}>
        <this.props.icon size={this.props.size} />
      </span>
    )
  }

}
