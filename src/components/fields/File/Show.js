import React from 'react'
import DeleteIcon from 'react-icons/lib/md/delete'
import ViewIcon from 'react-icons/lib/md/open-in-browser'
import autobind from 'autobind-decorator'

const styles = {
  container: {
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 9,
    fontSize: 20,
    color: '#000',
    display: 'flex'
  },
  name: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1
  },
  buttons: {
    width: 70,
    textAlign: 'right'
  },
  icon: {
    marginLeft: 10,
    cursor: 'pointer'
  }
}

export default class Show extends React.Component {

  static propTypes = {
    value: React.PropTypes.object,
    onChange: React.PropTypes.func
  }

  getName () {
    const parts = this.props.value.url.split('/')
    const last = parts[parts.length - 1]
    return last
  }

  @autobind
  delete () {
    this.props.onChange(null)
  }

  @autobind
  open () {
    window.open(this.props.value.url)
  }

  render () {
    return (
      <div style={styles.container}>
        <div style={styles.name}>
          {this.getName()}
        </div>
        <div style={styles.buttons}>
          <ViewIcon style={styles.icon} size={25} onClick={this.open} />
          <DeleteIcon style={styles.icon} size={25} onClick={this.delete} />
        </div>
      </div>
    )
  }

}
