import React from 'react'
import {Link, withRouter} from 'react-router'
import PropTypes from 'prop-types'

@withRouter
export default class Tabs extends React.Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.node.isRequired,
      path: PropTypes.string.isRequired
    })),
    router: PropTypes.object
  }

  renderTabs () {
    return this.props.items.map((item, index) => {
      const isActive = this.props.router.location.pathname === item.path
      if (isActive) {
        return <span className='os-tab-item-active' key={index}>{item.title}</span>
      } else {
        return <Link className='os-tab-item' key={index} to={item.path}>{item.title}</Link>
      }
    })
  }

  render () {
    return (
      <div className='os-tab-container'>
        {this.renderTabs()}
      </div>
    )
  }

}
