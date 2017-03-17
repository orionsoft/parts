import React from 'react'
import {AsyncCreatable, Creatable} from 'react-select'
import autobind from 'autobind-decorator'
import styles from '../Text/styles'

export default class Text extends React.Component {

  static propTypes = {
    fieldName: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.any,
    passProps: React.PropTypes.object,
    multi: React.PropTypes.bool,
    options: React.PropTypes.array,
    errorMessage: React.PropTypes.node,
    loadOptions: React.PropTypes.func,
    isValidNewOption: React.PropTypes.func,
    filterOption: React.PropTypes.func
  }

  static defaultProps = {
    isValidNewOption: () => false
  }

  state = {}

  @autobind
  onChange (item) {
    const items = this.props.multi ? item : item ? [item] : []
    if (items.length) {
      const values = items.map(item => item.value)
      const finalValue = this.props.multi ? values : values[0]
      this.props.onChange(finalValue)
    } else {
      this.props.onChange(null)
    }
  }

  @autobind
  async loadOptions (input, callback) {
    const options = await this.props.loadOptions(input)
    callback(null, {options})
  }

  @autobind
  filterOption (...args) {
    if (this.props.filterOption) return this.props.filterOption(...args)
    return true
  }

  getFilterOption () {
    if (!this.props.loadOptions) return {options: this.props.options}
    return {filterOption: this.filterOption, loadOptions: this.loadOptions}
  }

  render () {
    const Comp = this.props.loadOptions ? AsyncCreatable : Creatable
    return (
      <div>
        <Comp
          multi={this.props.multi}
          name={this.props.fieldName}
          value={this.props.value}
          isValidNewOption={this.props.isValidNewOption}
          onChange={this.onChange}
          {...this.getFilterOption()}
          {...this.props.passProps}
        />
        <div style={styles.error}>{this.props.errorMessage}</div>
      </div>
    )
  }

}
