import React from 'react'
import autobind from 'autobind-decorator'
import throttle from 'lodash/throttle'

export default function (ComposedComponent) {
  return class WithScroll extends React.Component {

    constructor (props) {
      super(props)
      this.state = this.calculateScroll()
      this.debouncedHandle = throttle(this.setNewState, 50)
    }

    calculateScroll () {
      const {scrollX, scrollY} = window
      return {scrollX, scrollY}
    }

    @autobind
    setNewState () {
      this.setState(this.calculateScroll())
    }

    componentDidMount () {
      window.addEventListener('scroll', this.debouncedHandle)
    }

    componentWillUnmount () {
      window.removeEventListener('scroll', this.debouncedHandle)
    }

    render () {
      // console.log('rerendering scroll', this.state)
      return <ComposedComponent {...this.props} {...this.state} />
    }
  }
}
