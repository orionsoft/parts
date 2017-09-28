import React from 'react'
import ReactTooltip from 'react-tooltip'
import isString from 'lodash/isString'
import autobind from 'autobind-decorator'
import uniqueId from 'lodash/uniqueId'
import PropTypes from 'prop-types'

export default class Tooltip extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    content: PropTypes.node,
    place: PropTypes.string
  }

  @autobind
  getContent () {
    if (isString(this.props.content)) {
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
        <ReactTooltip id={id} place={this.props.place} effect='solid' getContent={this.getContent} />
      </div>
    )
  }

}
