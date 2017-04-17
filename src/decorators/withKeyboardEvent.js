import React from 'react'
import isArray from 'lodash/isArray'
import autobind from 'autobind-decorator'
import without from 'lodash/without'
import union from 'lodash/union'
import clone from 'lodash/clone'
import isEqual from 'lodash/isEqual'
import debounce from 'lodash/debounce'
import keyCodes from '../helpers/keyCodes'

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

      cancelKeyPress (keyCode) {
        if (keyCode === 13) {
          const activeElement = document.activeElement
          if (!activeElement) return
          const tag = activeElement.tagName
          if (tag === 'TEXTAREA') return true
        }
      }

      @autobind
      onKeyDown (event) {
        const keyCode = event.keyCode
        if (this.cancelKeyPress(keyCode)) return
        const oldPressedKeys = clone(this.pressedKeys)
        this.pressedKeys = union(this.pressedKeys, [keyCode])
        if (isEqual(this.pressedKeys, oldPressedKeys)) return
        this.checkKeys(event)
        this.cleanKeys()
      }

      @autobind
      onKeyUp (event) {
        const keyCode = event.keyCode
        if (this.cancelKeyPress(keyCode)) return
        const oldPressedKeys = clone(this.pressedKeys)
        this.pressedKeys = without(this.pressedKeys, keyCode)
        if (isEqual(this.pressedKeys, oldPressedKeys)) return
        this.checkKeys(event)
        this.cleanKeys()
      }

      getCombinationKeyCodes (combination) {
        const parts = combination.split('+')
        return parts.map(key => {
          return keyCodes[key]
        })
      }

      getChild (from) {
        from = from || this
        if (!from.refs.keyboardEventChild) return from
        return this.getChild(from.refs.keyboardEventChild)
      }

      checkKeys (event) {
        for (const combination of keys) {
          const codes = this.getCombinationKeyCodes(combination)
          if (isEqual(codes, this.pressedKeys)) {
            this.getChild()[functionName](event)
            // return event.preventDefault()
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
        return <Child ref='keyboardEventChild' {...this.props} />
      }

    }
  }
}
