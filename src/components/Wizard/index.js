import React from 'react'
import PropTypes from 'prop-types'

export default class Wizard extends React.Component {

  static propTypes = {
    step: PropTypes.number,
    steps: PropTypes.array,
    children: PropTypes.node
  }

  static defaultProps = {
    step: 0
  }

  renderSteps () {
    return this.props.steps.map((step, index) => {
      const className = []
      if (index === this.props.step) {
        className.push('active')
      }
      if (index < this.props.step) {
        className.push('completed')
      }
      return (
        <li className={className.join(' ')} key={index}>
          <span className='bubble' />
          {step.title}
        </li>
      )
    })
  }

  render () {
    return (
      <div className='os_wizard_container'>
        <ul className='progress-indicator'>
          {this.renderSteps()}
        </ul>
        <div className='os_wizard_content'>
          {this.props.children}
        </div>
      </div>
    )
  }

}
