import React from 'react'
import Select from 'react-select'
import autobind from 'autobind-decorator'

export default class Text extends React.Component {

  static propTypes = {
    fieldName: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.any,
    passProps: React.PropTypes.object,
    options: React.PropTypes.array
  }

  @autobind
  onChange (item) {
    if (item) {
      this.props.onChange(item.value)
    } else {
      this.props.onChange(null)
    }
  }

  render () {
    return (
      <div>
        <Select
          name={this.props.fieldName}
          value={this.props.value}
          options={this.props.options}
          onChange={this.onChange}
          {...this.props.passProps}
        />
      </div>
    )
  }

}
