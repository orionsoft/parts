import React from 'react'
import PropTypes from 'prop-types'

export default class IncrementalNumber extends React.Component {

  static propTypes = {
    number: PropTypes.number,
    format: PropTypes.string,
    duration: PropTypes.number,
    steps: PropTypes.number
  }

  static defaultProps = {
    format: '0,0',
    duration: 5000,
    steps: 50
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

  componentWillUnmount () {
    this.clearTimeouts()
  }

  clearTimeouts () {
    this.timeouts.map(timeout => {
      clearTimeout(timeout)
    })
  }

  startUpgrade ({from, to}) {
    this.clearTimeouts()
    const step = (to - from) / this.props.steps
    const timeStep = this.props.duration / this.props.steps
    for (let i = 0; i < this.props.steps; i++) {
      const timeout = setTimeout(() => {
        this.setState({number: from + (step * i)})
        const index = this.timeouts.indexOf(timeout)
        if (index > -1) {
          this.timeouts.splice(index, 1)
        }
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
