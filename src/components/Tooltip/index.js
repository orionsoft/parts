import React from 'react'
import ReactTooltip from 'react-tooltip'
import isString from 'lodash/isString'
import autobind from 'autobind-decorator'
import uniqueId from 'lodash/uniqueId'

export default class Tooltip extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    content: React.PropTypes.node
  }

  @autobind
  getContent () {
    if (isString) {
      return this.props.content.split('\n').map((line, index) => <div key={index}>{line}</div>)
    }
    return this.props.content
  }

  render () {
    const id = uniqueId('os-tooltip')
    return (
      <div style={{display: 'inline-block'}}>
        <div data-tip='' data-for={id}>
          {this.props.children}
        </div>
        <ReactTooltip id={id} effect='solid' getContent={this.getContent} />
      </div>
    )
  }

}
