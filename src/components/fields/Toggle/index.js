import React from 'react'
import Switch from 'react-ios-switch'
import PropTypes from 'prop-types'

export default class Toggle extends React.Component {

  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    passProps: PropTypes.object,
    label: PropTypes.node
  }

  render () {
    return (
      <div className='os_toggle_container'>
        <Switch
          onColor='#0069ff'
          checked={this.props.value}
          onChange={checked => this.props.onChange(checked)}
          {...this.props.passProps} />
        <div className='os_toggle_label' onClick={() => this.props.onChange(!this.props.value)}>
          {this.props.label}
        </div>
      </div>
    )
  }

}
