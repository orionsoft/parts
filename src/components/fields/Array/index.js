import React from 'react'
import {ArrayComponent} from 'simple-react-form'
import Button from '../../Button'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'
import without from 'lodash/without'

// Sortable Elements
const SortableItem = SortableElement(({item}) => <div>{item}</div>)

const SortableList = SortableContainer(({items}) => {
  return (
    <div>
      {items.map((item, index) => <SortableItem key={`item-${index}`} index={index} item={item} />)}
    </div>
  )
})

export default class Array extends ArrayComponent {
  static propTypes = {
    ...ArrayComponent.propTypes,
    childrenClassName: React.PropTypes.string
  }

  static defaultProps = {
    ...ArrayComponent.defaultProps,
    childrenClassName: `array array-1`
  }

  removeItem (index) {
    const value = this.props.value || []
    var newArray = without(value, value[index])
    this.props.onChange(newArray)
  }

  renderRemoveButton (index) {
    if (this.props.disabled) return
    return <Button danger label={this.props.removeLabel} onClick={() => this.removeItem(index)} />
  }

  renderAddButton () {
    if (!this.props.showAddButton) return
    if (this.props.disabled) return
    return <Button primary label={this.props.addLabel} onClick={() => this.addItem()} />
  }
  // this function return the specific field
  renderChildrenItem ({ index, children }) {
    return (
      <div className={this.props.childrenClassName} key={`${this.props.fieldName}.${index}`}>
        {this.renderChildrenItemWithContext({index, children})}
        <button type='button' onClick={() => this.removeItem(index)}>
          {this.props.removeLabel}
        </button>
      </div>
    )
  }

  // Render children according to elements inside value
  renderChildren () {
    const value = this.props.value || []
    if (this.props.autoAddItem && !this.props.disabled && value.length === 0) {
      value.push({})
    }
    const items = value.map((item, index) => {
      const children = this.getChildrenComponents(item, index)
      return this.renderChildrenItem({ index, children })
    })
    const onSortEnd = ({oldIndex, newIndex}) => this.props.onChange(arrayMove(value, oldIndex, newIndex))
    return <SortableList items={items} onSortEnd={onSortEnd} />
  }

  render () {
    return (
      <div style={{ marginTop: 20 }}>
        <div>{this.props.label}</div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        <div className={this.props.parentClassName}>
          {this.renderChildren()}
        </div>
        <div style={{ marginTop: 10 }}>
          {this.renderAddButton()}
        </div>
      </div>
    )
  }
}
