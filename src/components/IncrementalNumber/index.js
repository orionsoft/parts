import React from 'react'

export default class IncrementalNumber extends React.Component {

  static propTypes = {
    number: React.PropTypes.number,
    format: React.PropTypes.string,
    duration: React.PropTypes.number,
    steps: React.PropTypes.number
  }

  static defaultProps = {
    format: '0,0',
    duration: 10000,
    steps: 100
  }

  constructor (props) {
    super(props)
    this.state = {number: props.number}
  }

  timeouts = []

  componentDidUpdate (prevProps) {
    if (prevProps.number !== this.props.number) {
      this.startUpgrade({from: prevProps.number, to: this.props.number})
    }
  }

  startUpgrade ({from, to}) {
    this.timeouts.map(timeout => {
      clearTimeout(timeout)
    })
    const step = (to - from) / this.props.steps
    const timeStep = this.props.duration / this.props.steps
    for (let i = 0; i < this.props.steps; i++) {
      const timeout = setTimeout(() => {
        this.setState({number: from + (step * i)})
      }, timeStep * i)
      this.timeouts.push(timeout)
    }
  }

  renderNumber () {
    return global.numeral(this.state.number).format(this.props.format)
  }

  render () {
    return <span>{this.renderNumber()}</span>
  }

}
