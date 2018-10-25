import React from 'react'
import Select from 'react-select'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'

export default class SelectField extends React.Component {
  static propTypes = {
    fieldName: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    passProps: PropTypes.object,
    errorMessage: PropTypes.node,
    label: PropTypes.node,
    description: PropTypes.node,
    multi: PropTypes.bool,
    options: PropTypes.array
  }

  static defaultProps = {
    options: []
  }

  state = {}

  @autobind
  onChange(params) {
    const {multi} = this.props
    if (multi) {
      this.props.onChange(params.map(item => item.value))
    } else {
      this.props.onChange(params.value)
    }
  }

  getValue() {
    const {value, options, multi} = this.props
    if (multi) {
      const selectedOptions = (value || []).map(optionValue =>
        (options || []).find(option => option.value === optionValue)
      )
      return selectedOptions.filter(option => !!option)
    } else {
      const selectedOption = options.find(option => option.value === value)
      if (!selectedOption) return
      return selectedOption
    }
  }

  render() {
    return (
      <div>
        <div className="label">{this.props.label}</div>
        <Select
          classNamePrefix="orion-select"
          isMulti={this.props.multi}
          name={this.props.fieldName}
          value={this.getValue()}
          onChange={this.onChange}
          options={this.props.options}
          {...this.props.passProps}
        />
        <div className="description">{this.props.description}</div>
        <div className="os-input-error">{this.props.errorMessage}</div>
      </div>
    )
  }
}
