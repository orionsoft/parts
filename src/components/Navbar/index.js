import React from 'react'
import Container from '../Container'
import {Link} from 'react-router'

export default class Navbar extends React.Component {

  static propTypes = {
    logo: React.PropTypes.string
  }

  renderLogo () {
    return <Link to='/'><img src={this.props.logo} alt='Logo' className='os_navbar-logo' /></Link>
  }

  render () {
    return (
      <div className='os_navbar'>
        <Container>
          {this.renderLogo()}
        </Container>
      </div>
    )
  }

}
