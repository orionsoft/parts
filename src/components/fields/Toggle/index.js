import React from 'react'
import Switch from 'react-ios-switch'

export default class Toggle extends React.Component {

  static propTypes = {
    value: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    passProps: React.PropTypes.object,
    label: React.PropTypes.node
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
