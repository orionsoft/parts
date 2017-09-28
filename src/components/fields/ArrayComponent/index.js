import React from 'react'
import {ArrayComponent} from 'simple-react-form'
import Button from '../../Button'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'
import RemoveIcon from 'react-icons/lib/md/cancel'
import without from 'lodash/without'
import PropTypes from 'prop-types'

// Sortable Elements
const SortableItem = SortableElement(({item}) => <div>{item}</div>)

const SortableList = SortableContainer(({items, draggable}) => {
  return (
    <div>
      {items.map((item, index) => <SortableItem disabled={!draggable} key={`item-${index}`} index={index} item={item} />)}
    </div>
  )
})

export default class Array extends ArrayComponent {
  static propTypes = {
    ...ArrayComponent.propTypes,
    childrenClassName: PropTypes.string,
    draggable: PropTypes.bool
  }

  static defaultProps = {
    ...ArrayComponent.defaultProps,
    childrenClassName: `os-s-array os-s-array-1`,
    draggable: true
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
        <div className='os-array-item-content'>
          {this.renderChildrenItemWithContext({index, children})}
        </div>
        <div className='os-array-item-remove'>
          <Button danger onClick={() => this.removeItem(index)}>
            <RemoveIcon />
          </Button>
        </div>
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
    return <SortableList
      helperClass='os-s-array-grabbing'
      distance={2}
      items={items}
      draggable={this.props.draggable}
      onSortEnd={onSortEnd} />
  }

  render () {
    return (
      <div style={{ marginTop: 20 }}>
        <div>{this.props.label}</div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        <div className={this.props.parentClassName}>
          {this.renderChildren()}
        </div>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          {this.renderAddButton()}
        </div>
      </div>
    )
  }
}
