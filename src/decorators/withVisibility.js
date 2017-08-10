import React from 'react'
import autobind from 'autobind-decorator'
import throttle from 'lodash/throttle'

export default function({offset, once} = {offset: 0, once: false}) {
  return function(ComposedComponent) {
    return class WithVisibility extends React.Component {
      constructor(props) {
        super(props)
        this.debouncedHandle = throttle(this.calculateScroll, 50)
      }

      state = {}

      isVisible() {
        const element = this.refs.main
        const rect = element.getBoundingClientRect()
        const {top, height} = rect

        if (top - window.innerHeight > -offset) return false
        if (top + height < 0) return false

        return true
      }

      @autobind
      calculateScroll() {
        const visible = this.isVisible()
        if (visible === this.state.visible) return
        if (visible && once) {
          this.componentWillUnmount()
        }
        this.setState({visible})
      }

      componentDidMount() {
        this.calculateScroll()
        window.addEventListener('scroll', this.debouncedHandle)
        window.addEventListener('resize', this.debouncedHandle)
      }

      componentWillUnmount() {
        window.removeEventListener('scroll', this.debouncedHandle)
        window.removeEventListener('resize', this.debouncedHandle)
      }

      render() {
        return (
          <div ref="main">
            <ComposedComponent visible={this.state.visible} {...this.props} {...this.state} />
          </div>
        )
      }
    }
  }
}
