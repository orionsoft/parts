import React from 'react'
import {Link} from 'react-router'
import withoutLink from './withoutLink'

export default class Button extends withoutLink {

  renderLinkButton () {
    return (
      <Link to={this.props.to} className='os_buttonLink'>
        {this.renderButton()}
      </Link>
    )
  }

}
