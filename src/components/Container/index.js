import React from 'react'

const styles = {
  base: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    margin: '0 auto'
  },
  big: {
    maxWidth: 1200
  },
  small: {
    maxWidth: 600
  },
  medium: {
    maxWidth: 900
  }
}

export default class Container extends React.Component {

  static propTypes = {
    children: React.PropTypes.any,
    style: React.PropTypes.object,
    size: React.PropTypes.string
  }

  static defaultProps = {
    size: 'big'
  }

  getStyle () {
    return {
      ...styles.base,
      ...styles[this.props.size],
      ...this.props.style
    }
  }

  render () {
    return (
      <div style={this.getStyle()}>
        {this.props.children}
      </div>
    )
  }

}
