import React from 'react'
import isArray from 'lodash/isArray'
import autobind from 'autobind-decorator'
import without from 'lodash/without'
import union from 'lodash/union'
import clone from 'lodash/clone'
import isEqual from 'lodash/isEqual'
import debounce from 'lodash/debounce'

const keyMap = {
  'alt': 18,
  'a': 65
}

export default function (keys, functionName) {
  keys = isArray(keys) ? keys : [keys]
  return function (Child) {
    return class KeyboardEvent extends React.Component {

      constructor (props) {
        super(props)
        this.pressedKeys = []
        this.cleanKeys = debounce(this.cleanKeys, 1000)
      }

      @autobind
      cleanKeys () {
        this.pressedKeys = []
      }

      @autobind
      onKeyDown (event) {
        const keyCode = event.keyCode
        const oldPressedKeys = clone(this.pressedKeys)
        this.pressedKeys = union(this.pressedKeys, [keyCode])
        if (isEqual(this.pressedKeys, oldPressedKeys)) return
        this.checkKeys(event)
        this.cleanKeys()
      }

      @autobind
      onKeyUp (event) {
        const keyCode = event.keyCode
        const oldPressedKeys = clone(this.pressedKeys)
        this.pressedKeys = without(this.pressedKeys, keyCode)
        if (isEqual(this.pressedKeys, oldPressedKeys)) return
        this.checkKeys(event)
        this.cleanKeys()
      }

      getCombinationKeyCodes (combination) {
        const parts = combination.split('+')
        return parts.map(key => {
          return keyMap[key]
        })
      }

      checkKeys (event) {
        for (const combination of keys) {
          const codes = this.getCombinationKeyCodes(combination)
          if (isEqual(codes, this.pressedKeys)) {
            this.refs.child[functionName](event)
            return event.preventDefault()
          }
        }
      }

      componentDidMount () {
        document.addEventListener('keydown', this.onKeyDown)
        document.addEventListener('keyup', this.onKeyUp)
      }

      componentWillUnmount () {
        document.removeEventListener('keydown', this.onKeyDown)
        document.addEventListener('keyup', this.onKeyUp)
      }

      render () {
        return <Child ref='child' {...this.props} />
      }

    }
  }
}
