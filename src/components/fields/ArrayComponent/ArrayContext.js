import React from 'react'
import {ArrayContextItem} from 'simple-react-form/lib/Array/ArrayContextItem'

export default class ArrayContext extends ArrayContextItem {

  static propTypes = {
    ...ArrayContextItem.defaultProps
  }
  static defaultProps = {
    ...ArrayContextItem.defaultProps
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

}
