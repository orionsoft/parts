import React from 'react'
import autobind from 'autobind-decorator'
import throttle from 'lodash/throttle'

export default function(ComposedComponent) {
  return class WithSize extends React.Component {
    constructor(props) {
      super(props)
      this.state = this.calculateSize()
      this.debouncedHandle = throttle(this.setNewState, 50)
    }

    calculateSize() {
      const {innerHeight, innerWidth} = window
      return {innerHeight, innerWidth}
    }

    @autobind
    setNewState() {
      this.setState(this.calculateSize())
    }

    componentDidMount() {
      window.addEventListener('resize', this.debouncedHandle)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.debouncedHandle)
    }

    render() {
      return <ComposedComponent {...this.props} {...this.state} />
    }
  }
}
