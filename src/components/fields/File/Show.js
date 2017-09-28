import React from 'react'
import DeleteIcon from 'react-icons/lib/md/delete'
import ViewIcon from 'react-icons/lib/md/open-in-browser'
import autobind from 'autobind-decorator'
import cleanFileURL from './cleanFileURL'
import PropTypes from 'prop-types'

const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 7,
    fontSize: 18,
    color: '#000',
    display: 'flex',
    border: '1px solid #c2c2c2'
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
    value: PropTypes.object,
    onChange: PropTypes.func
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
          {cleanFileURL(this.props.value.url)}
        </div>
        <div style={styles.buttons}>
          <ViewIcon style={styles.icon} size={25} onClick={this.open} />
          <DeleteIcon style={styles.icon} size={25} onClick={this.delete} />
        </div>
      </div>
    )
  }

}
