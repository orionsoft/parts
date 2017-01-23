import React from 'react'
import debounce from 'lodash/debounce'

export default function (debounceTime) {
  return function (Child) {
    return class Debounce extends React.Component {

      static propTypes = {
        variables: React.PropTypes.object
      }

      constructor (props) {
        super(props)
        this.deboucedDidRecieveProps = debounce(this.didRecieveProps, debounceTime)
        this.state = {props, propsIndex: 1}
      }

      didRecieveProps (props) {
        this.setState(oldState => {
          return {props, debouncing: false, propsIndex: oldState.propsIndex + 1}
        })
      }

      componentWillReceiveProps (nextProps) {
        this.setState({debouncing: true})
        this.deboucedDidRecieveProps(nextProps)
      }

      shouldComponentUpdate (nextProps, nextState) {
        if (nextState.propsIndex !== this.state.propsIndex) return true
        if (nextState.debouncing !== this.state.debouncing) return true
        return false
      }

      render () {
        return <Child ref='child' debouncing={this.state.debouncing} {...this.state.props} />
      }

    }
  }
}
