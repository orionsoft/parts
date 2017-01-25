import React from 'react'
import styles from './styles'
import Autocomplete from 'react-autocomplete'
import autobind from 'autobind-decorator'
import debounce from 'lodash/debounce'
import Spinner from '../../Spinner'

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
    this.fetch = debounce(this.fetch, 150)
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.value) return this.setState({items: []})
    if (nextProps.value !== this.props.value) {
      this.setState({loading: true})
      this.fetch(nextProps.value)
    }
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
            inputProps={{ style: styles.input, placeholder: this.props.placeholder }}
            menuStyle={styles.menu}
            wrapperStyle={styles.wrapper}
            value={this.props.value}
            items={this.state.items}
            onSelect={value => this.props.onChange(value)}
            onChange={event => this.props.onChange(event.target.value)}
            renderItem={this.renderItem}
            getItemValue={item => item}
            {...this.props.passProps} />
          <div style={styles.otherContainer}>
            <Spinner loading={this.state.loading} />
          </div>
        </div>
        <div style={styles.error}>{this.props.errorMessage}</div>
      </div>
    )
  }

}
