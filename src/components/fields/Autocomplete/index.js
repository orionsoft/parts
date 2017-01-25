import React from 'react'
import styles from './styles'
import Autocomplete from 'react-autocomplete'
import autobind from 'autobind-decorator'
import debounce from 'lodash/debounce'
import Loading from '../../Loading'

export default class AutocompleteField extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    passProps: React.PropTypes.object,
    placeholder: React.PropTypes.node,
    errorMessage: React.PropTypes.node,
    getItems: React.PropTypes.func.isRequired
  }

  state = {items: [], loading: false}

  constructor (props) {
    super(props)
    this.fetch = debounce(this.fetch, 100)
  }

  @autobind
  onSelect (value) {
    this.props.onChange(value)
  }

  @autobind
  onChange (event) {
    const value = event.target.value
    this.setState({loading: true})
    this.fetch(value)
    this.props.onChange(value)
  }

  async fetch (search) {
    try {
      const items = await this.props.getItems(search)
      this.setState({items, loading: false})
    } catch (error) {
      this.setState({loading: false})
      console.log('Error:', error)
    }
  }

  @autobind
  renderItem (item, isHighlighted) {
    const classes = ['os_autocomplete_item']
    if (isHighlighted) classes.push('highlighted')
    return <div className={classes.join(' ')}>{item}</div>
  }

  render () {
    return (
      <div>
        <div style={styles.container}>
          <Autocomplete
            inputProps={{ style: styles.input, placeholder: this.props.placeholder, onFocus: () => this.fetch('') }}
            menuStyle={styles.menu}
            wrapperStyle={styles.wrapper}
            value={this.props.value}
            items={this.state.items}
            onSelect={this.onSelect}
            onChange={this.onChange}
            renderItem={this.renderItem}
            getItemValue={item => item}
            {...this.props.passProps} />
          <div style={{...styles.otherContainer, opacity: this.state.loading ? 1 : 0}}>
            <Loading size={25} />
          </div>
        </div>
        <div style={styles.error}>{this.props.errorMessage}</div>
      </div>
    )
  }

}
